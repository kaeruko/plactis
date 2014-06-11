#include <stdio.h>
#include <stdlib.h>

void mygets()
{
    int myint;

    char str[3];
    fgets(str, sizeof(str), stdin);
    myint = atoi( str ) * 2 ;

    puts(str );

    printf("%ld\n", sizeof(str));

//    printf("%d\n", myint);
}


int main(int argc, char const *argv[])
{
    int i = 100;
    mygets();

    printf("戻って来たよ %d \n", i);

    /* code */
    return 0;
}