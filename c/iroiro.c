#include <stdio.h>
#include <stdlib.h>

int gloval;

const int coni = 0;
    int zero = 0;
    int one = 1;
    int zero2 = 0;
    int one2 = 1;
int main(int argc, char *argv[])
{

    int *p = NULL,i;

    int *mi = NULL;

//    *p = 10; /* 通常変数モードに切り替えたポインタ変数に代入 */

    mi = (int * ) malloc(sizeof(int));

    printf("zero = %p\n",&zero);

    printf("one  = %p\n",&one);

    printf("zero2 = %p\n",&zero2);

    printf("one2  = %p\n",&one2);

   //  printf("*argc = %p\n",&argc);
   //  printf("*argv = %p\n",&argv);
   //  printf("*gloval = %p\n",&gloval);
   //  printf("*coni = %p\n",&coni);
   //  printf("*mi = %p\n",mi);
   //  printf("*p = %p\n",&p);
   // printf("i = %p\n",&i);
    return 0;
 }