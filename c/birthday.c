#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_NUM 100

int int_sort( const void * a, const void *b){
    if( *(int *)a >  *(int *)b ){
        return -1;
    }else if( *(int *)a == *(int *)b ){
        return 0;
    }
    return 1;
}

int birthday_conflict(int student);


int main(int argc, char  *argv[])
{

int min = 10, max = 20;

//printf("%f\n",  min + ( RAND_MAX * 0.8 * ( max - min + 1.0 )  / (1.0 + RAND_MAX )   )   );

printf("%f\n", 20 * 0.8 * (max - min + 1.0 )   );

printf("%f\n", min +  98 * (max - min + 1.0 ) / ( 1.0 + 100 )  );


exit(0);

    int ret =0, i =0 , c =0;
    srand(time(0));

    //人数
    for (i = 2; i < 100; ++i)
    {
        int hit=0, nohit=0, alltry = 0;
        for (c = 0; c < 10000; ++c)
        {
            alltry ++;
            ret = birthday_conflict( i );
            if(ret == 1){
                hit++;
            }else{
                nohit++;
            }

        }
//       printf(" StudentCount: %d , HitPercentage:  %d / %d  \n",  i,  hit, alltry );
       printf(" [%d ,  %.1f ],\n", i,  (float)hit / alltry * 100 );

    }

    /* code */
    return 0;
}


int birthday_conflict( int student ){
    int day,  i = 0;

    int day_list[MAX_NUM];

    if( student > MAX_NUM ){
        printf("num is over MAX_NUM\n");
        exit(0);
    }

    for (i = 0; i < student; ++i)
    {
        //ランダムに一日取ってくる


        day = (int)(((double)rand())/((unsigned int)RAND_MAX + 1) * 365 );
        day_list[i] = day;
    }

    qsort( (void *)day_list, student, sizeof(day_list[0]), int_sort  );

    for (i = 0; i < student; ++i)
    {
//       printf("birthday: %d\n", day_list[i]);
        if( i > 0  ){
            if( day_list[i] == day_list[i - 1] ){
//                printf("birthday conflict: %d %d\n", day_list[i], day_list[i-1]);
                return 1;   //hit
            }
        }

    }
    return 0;   //no hit

}