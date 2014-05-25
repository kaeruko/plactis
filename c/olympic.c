#include <stdio.h>

int isOpen(int year);


int main(void){
    int year;
    int ret ;
    scanf("%d",&year);

    ret = isOpen(year);
    if(ret == 0){
        printf("開催\n");
    }else{
        printf("開催しない\n");
    }

    return ret;
}

int isOpen(int year){
    enum{
        OPEN,
        CLOSE,
    };
    if(year % 2 == 0){
        return OPEN;
    }
    return CLOSE;

}