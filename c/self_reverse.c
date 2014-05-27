#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct list {
    char name[10];
    struct list *next;
};

struct list *add( struct list *head, char name[] );
void show( struct list *head );
void free_list( struct list *head );

void show_target( struct list *head , int target);

void insert( struct list *head , int target);

void delete_list( struct list *head , int target);

int main(int argc, char *argv[])
{
    struct list *head;

    char name[10];

    int i ;
    int count = 3;
    int num = 0;

    head = NULL;

    for (i = 0; i < count; ++i)
    {
        scanf("%s", name);
        head = add(head, name);
    }
    // show_target(head, num);
    // insert(head, num);
    delete_list(head, num);
    show(head);
    free(head);

    return 0;
}

struct list *add( struct list *head, char name[] ){
    struct list *p, *p2;
    p = (struct list *) malloc(sizeof(struct list));
    strcpy(p->name, name);
    p->next = NULL;

// printf("name = %s p = %p  \n", name,  p);

    if(head == NULL){
        p->next = head;
        return p;
    }
    p2 = head;
    while(p2->next != NULL){
        p2 = p2->next;
    }
    p2->next = p;
    return head;
 }


void show( struct list *head ){
    struct list *p ;
    while(head != NULL){
printf("p = %p c = %s\n", p, head->name);
        p = head->next;
        head = p;
    }
}

void show_target( struct list *head , int target){
    struct list *p ;
    int i = 0;
    while(head != NULL){
        if(i == target){
            printf("%s\n", head->name);
        }
        p = head->next;
        head = p;
        i++;
    }
}

void insert( struct list *head , int target){
    struct list *add;
    add = (struct list *)malloc(sizeof(struct list));

    struct list *p, *prev;
    int i = 0;
    while(head != 0){
        prev = head;
        p = head->next;
        head = p;
                            // printf("i = %d name= %s prev = %p current= %p \n", i, head->name, prev, head);
        if( i == target ){
            add->next = head;
            strcpy(add->name, "add");
            prev->next = add;
                            // printf("* \n");
            break;
        }
        i++;
    }
}

void delete_list( struct list *head , int target){
    struct list *add;
    add = (struct list *)malloc( sizeof( struct list )  );
    struct list *p, *prev;
    int i = 0;
    while(head != 0){
        prev = head;
        p = head->next;
        head = p;
        if( i == target){
            prev->next = head->next;
            free(head);
            break;
        }
        i++;
    }
}

void free_list( struct list *head ){
    struct list *p;
    while(head != NULL){
        p = head->next;
        free(head);
        head = p;
    }

}
