#include <stdio.h>
#include <stdlib.h>

struct list {
    struct list *listpointer;
};

struct list *add( struct list *list );  //関数の＊

void show( struct list *list);

int main()
{
    struct list *list;

    int i, count = 3;

    list = NULL;

    for (i = 0; i < count; ++i)
    {
        list = add(list);
    }

    show(list);

    return 0;
}

struct list *add( struct list *list ){
    struct list *tmp;
    tmp = (struct list *)malloc(sizeof(struct list));
    tmp->listpointer = list;
    return tmp;
}

void show( struct list *list){

    struct list *tmp ;

    while(list != NULL)
    {
        tmp = list->listpointer;
        printf("ぐる\n");
        list = tmp;
    }

}