# include <stdio.h>
# include <stdlib.h>
# include <sys/stat.h>

int main(int argc, char *argv[])
{

    FILE *infp;
    FILE *outfp;
    //file存在チェック用
    struct stat st;
    //読み込みバッファ。binaryが入ってる
    unsigned char inbuf[10000];
//    unsigned char outbuf[10000];
    //書き込みバッファ
    int linecount,i;
    char outfile[] = "output.dat";

    //引数はファイル名を指定
    char *file = argv[1];

    printf("戻り値チェック: %d\n", stat(file, &st));

    //ファイル存在チェック。エラーの場合は-1
    if(stat(file, &st) != 0)
    {
        printf("%sは存在しません\n", file);
        return 0;
    }

    //バイナリ形式で開く
    infp = fopen(file, "rb");
    outfp = fopen(outfile, "wb");

    linecount = fread(&inbuf, sizeof( unsigned char ), 10000, infp);

    for (i = 0; i < linecount; ++i)
    {

        if(inbuf[i] == 0x0a || inbuf[i] == 0x0d)printf("\n");
        //1行ずつ読み込み
        printf("%02x ", inbuf[i]);
        //inbufを別のファイルに書き込む
<<<<<<< HEAD
        fwrite(inbuf, sizeof( unsigned char ), linecount, outfp);
=======
        fwrite(&inbuf, sizeof( unsigned char ), 10000, outfp);
>>>>>>> 79e2e04ae896e7263c69095cd5f93d6d93707918
    }


    fclose(infp);
    fclose(outfp);

    return 0;
}