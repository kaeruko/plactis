#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct list {
    char name[10];
    struct list *next;
};

struct list *add( struct list *head, char name[] );
void show( struct list *head );

int main(int argc, char *argv[])
{
    struct list *head;

    char name[10];

    int i ;
    int count = 3;

    head = NULL;

    for (i = 0; i < count; ++i)
    {
        scanf("%s", name);
        head = add(head, name);
    }
    show(head);
    return 0;
}

struct list *add( struct list *head, char name[] ){
    struct list *p, *p2;
    p = (struct list *) malloc(sizeof(struct list));
    strcpy(p->name, name);
    p->next = NULL;
    if(head == NULL){
        p->next = head;
        return p;
    }
    p2 = head;
    while(p2->next != NULL){
        p2 = p2->next;
    }
    p2->next = p;
printf("name = %s next = %p head = %p  \n", name, &head->next, &head);
    return head;

 }


void show( struct list *head ){
    struct list *p ;
    while(head != NULL){
printf("%s\n", head->name);
        p = head->next;
        head = p;
    }
}
