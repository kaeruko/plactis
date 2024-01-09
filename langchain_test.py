# MultiQueryRetrieverを使ってクエリ変換する

import glob
import json
import locale
import logging
import os
import pickle
import uuid
from getpass import getpass
from operator import itemgetter
from pathlib import Path
from typing import List, Literal

import openai
import weaviate
from huggingface_hub import hf_hub_download
from langchain.storage import InMemoryByteStore
from langchain.callbacks import StdOutCallbackHandler
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import LLMChain, RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import (DirectoryLoader, TextLoader,
                                        UnstructuredFileLoader,
                                        UnstructuredMarkdownLoader)
from langchain.document_loaders.parsers.pdf import PyPDFParser
from langchain.document_transformers import DoctranTextTranslator
from langchain.embeddings import (GPT4AllEmbeddings, HuggingFaceEmbeddings,
                                  OpenAIEmbeddings)
from langchain.llms import LlamaCpp, OpenAI, OpenAIChat
from langchain.output_parsers import PydanticOutputParser
from langchain.output_parsers.openai_functions import \
    PydanticAttrOutputFunctionsParser
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain.retrievers.cohere_rag_retriever import CohereRagRetriever
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain.retrievers.multi_vector import MultiVectorRetriever
from langchain.schema import BaseDocumentTransformer
from langchain.schema.document import Document
from langchain.schema.embeddings import Embeddings
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from langchain.storage import InMemoryStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.utils.openai_functions import \
    convert_pydantic_to_openai_function
from langchain.vectorstores import FAISS, Chroma, Weaviate
from langchain.vectorstores.faiss import FAISS
from langchain_core.callbacks.manager import RunManager
from langchain_core.output_parsers import StrOutputParser
from langchain_core.pydantic_v1 import BaseModel
from langchain_core.runnables import RunnableBranch, RunnablePassthrough
from llama_cpp import Llama, LlamaGrammar
from llama_cpp.llama import Llama, LlamaGrammar
from llama_index import (GPTListIndex, ListIndex, LLMPredictor, PromptHelper,
                         ServiceContext, SimpleDirectoryReader, StorageContext,
                         VectorStoreIndex, download_loader,
                         load_index_from_storage)
from llama_index.llms.base import ChatMessage, ChatResponse
from llama_index.llms.types import MessageRole

from pydantic import BaseModel, Field
from pydantic.dataclasses import dataclass
from tqdm.notebook import tqdm
from transformers import AutoModelForCausalLM, AutoTokenizer
from weaviate.embedded import EmbeddedOptions

openai.api_key = os.environ["OPENAI_API_KEY"]
openai.openai_api_model = "gpt-4-0613"

directory = 'datasets/confetti'
files = glob.glob(os.path.join(directory, '*'))
loaders = []
for file in files:
    extension = os.path.splitext(file)[1]
    if extension == '.txt':
        loaders.append(TextLoader(file))
    elif extension in ['.pdf', '.docx']:
        loaders.append(UnstructuredFileLoader(file))

docs = []
for l in loaders:
    docs.extend(l.load())
text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000)
docs = text_splitter.split_documents(docs)
# The vectorstore to use to index the child chunks
vectorstore = Chroma(
    collection_name="full_documents", embedding_function=OpenAIEmbeddings()
)
# The storage layer for the parent documents
store = InMemoryByteStore()
id_key = "doc_id"
# The retriever (empty to start)
retriever = MultiVectorRetriever(
    vectorstore=vectorstore,
    byte_store=store,
    id_key=id_key,
)
import uuid

doc_ids = [str(uuid.uuid4()) for _ in docs]
# The splitter to use to create smaller chunks
child_text_splitter = RecursiveCharacterTextSplitter(chunk_size=400)

sub_docs = []
for i, doc in enumerate(docs):
    _id = doc_ids[i]
    _sub_docs = child_text_splitter.split_documents([doc])
    for _doc in _sub_docs:
        _doc.metadata[id_key] = _id
    sub_docs.extend(_sub_docs)
retriever.vectorstore.add_documents(sub_docs)
retriever.docstore.mset(list(zip(doc_ids, docs)))

chain = (
    {"doc": lambda x: x.page_content}
    # | ChatPromptTemplate.from_template("Summarize the following document:\n\n{doc}")
    | ChatPromptTemplate.from_template("以下のドキュメントを日本語で要約してください:\n\n{doc}")
    | ChatOpenAI(max_retries=0)
    | StrOutputParser()
)
summaries = chain.batch(docs, {"max_concurrency": 5})
# The vectorstore to use to index the child chunks
vectorstore = Chroma(collection_name="summaries", embedding_function=OpenAIEmbeddings())
# The storage layer for the parent documents
store = InMemoryByteStore()
id_key = "doc_id"
# The retriever (empty to start)
retriever = MultiVectorRetriever(
    vectorstore=vectorstore,
    byte_store=store,
    id_key=id_key,
)
doc_ids = [str(uuid.uuid4()) for _ in docs]
summary_docs = [
    Document(page_content=s, metadata={id_key: doc_ids[i]})
    for i, s in enumerate(summaries)
]
retriever.vectorstore.add_documents(summary_docs)
retriever.docstore.mset(list(zip(doc_ids, docs)))



#####################



output_parser = StrOutputParser()
template = """user: Answer the question based only on the following context:
{context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

app_features_template = """
You are system analyst. You are good at analyzing complex system requirements and organizing information.
---------------------
{context}
---------------------
Please organize the following system requirements in the following column format: Item number, Item name, Input/Reference source, Business meaning, DB column, Format, Type, Max length, Required/Optional, Condition if conditional, Comment.
{input}"""
app_features_prompt = PromptTemplate.from_template(app_features_template)

feature_details_template = """
You are system analyst. You are good at analyzing complex system requirements and organizing information.
---------------------
{context}
---------------------
Please organize the following system requirements in the following column format: Item number, Item name, Input/Reference source, Business meaning, DB column, Format, Type, Max length, Required/Optional, Condition if conditional, Comment.
{input}"""
feature_details_prompt = PromptTemplate.from_template(feature_details_template)

general_prompt = PromptTemplate.from_template(
"""
You are system analyst. You are good at analyzing complex system requirements and organizing information.
---------------------
{context}
---------------------
Please organize the following system requirements in the following column format: Item number, Item name, Input/Reference source, Business meaning, DB column, Format, Type, Max length, Required/Optional, Condition if conditional, Comment.
{input}
"""
)
prompt_branch = RunnableBranch(
    (lambda x: x["topic"] == "app_features", app_features_prompt),
    (lambda x: x["topic"] == "feature_details", feature_details_prompt),
    general_prompt,
)

class TopicClassifier(BaseModel):
    "please classify the user's question"
    topic: Literal["app_features", "feature_details", "general"]
    "user's question topic is either 'app_features', 'feature_details' or 'general'"

classifier_function = convert_pydantic_to_openai_function(TopicClassifier)
llm = ChatOpenAI().bind(
    functions=[classifier_function], function_call={"name": "TopicClassifier"}
)
parser = PydanticAttrOutputFunctionsParser(
    pydantic_schema=TopicClassifier, attr_name="topic"
)
classifier_chain = llm | parser

query = "please build a profile creation function"

pipeline = (
    {
        "context": itemgetter("input") | retriever,
        "topic": itemgetter("input") | classifier_chain,
        "input": itemgetter("input")
    }
    | prompt_branch
    | llm
    | StrOutputParser()
)
answer = pipeline.invoke({"input":query})
print("answer:",answer,":\n")
