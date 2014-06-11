#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

int main(int argc, char *argv[])
{
    //素数かチェックする数値
    int num, i;
    //numは100以下限定
    int max = 10000;
    int division;
    int primeflg = 1;

    for (num = 2; num < 10000; ++num)
    {
        primeflg = 1;
        if(num > max){
            printf("please enter little than %d \n", max);
            exit(0);
        }

        for (i = 2; i < sqrt(num); ++i)
        {
            division = num % i;
            if( division == 0  && num != i ){
//                printf("%dの素数は%dです\n", num, i);
                primeflg = 0;
                break;
            }
        }

        if(primeflg){
           printf("%d\n",  num  );
        }
    }

    /* code */
    return 0;
}