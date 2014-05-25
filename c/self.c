#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct list {
    int key;            /* キー */
    char name[20];      /* 名前 */
    struct list *next;      /* 次のデータへのポインタ */
};

struct list *add_list(int key, char *name, struct list *head);
void show_list(struct list *p);
void free_list(struct list *p);

int main(void)
{
    struct list *head;      /* 先頭ポインタ */
    char name[20];
    int key = 0;

    head = NULL;        /* 先頭ポインタにNULLを設定 */

    printf("キーと名前（MAX:19文字）を入力（終了:CTRL+Z）\n");
    while (scanf("%d %s", &key, name) != EOF) {
        /* リストにデータを登録 */
        head = add_list(key, name, head);
    }
    /* リストの表示 */
    show_list(head);

    /* リストの開放 */
    free_list(head);

    return 0;
}

/*** リストにデータを登録 ***/
struct list *add_list(int key, char *name, struct list *head)
{
    struct list *p;

    /* 記憶領域の確保 */
    if ((p = (struct list *) malloc(sizeof(struct list))) == NULL) {
        printf("malloc error\n");
        exit(EXIT_FAILURE);
    }

    /* リストにデータを登録 */
    p->key = key;
    strcpy(p->name, name);

    /* ポインタのつなぎ換え */
    p->next = head;     /* 今までの先頭ポインタを次ポインタに */
    head = p;           /* 新たな領域を先頭ポインタに */

    return head;
}

/*** リストの表示 ***/
void show_list(struct list *p)
{
    while (p != NULL) { /* 次ポインタがNULLまで処理 */
        printf("%3d %s\n", p->key, p->name);
        p = p->next;
    }
}

/*** リストの開放 ***/
void free_list(struct list *p)
{
    struct list *p2;

    while (p != NULL) {     /* 次ポインタがNULLまで処理 */
        p2 = p->next;
        free(p);
        p = p2;
    }
}
