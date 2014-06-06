#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define MAX 10
int int_sort(const void *a, const void *b);

int int_sort(const void *a, const void *b)
{
    if( * (int * )a < *(int *)b ){
        return -1;
    }
    else
    if( * ( int *)a == *(int *)b){
        return 0;
    }
    return 1;
}

int main(void)
{
    FILE *fp;
    char s[MAX];
    int element_count = 0, i=0;
    float row = 0 ,total = 0 , denominator = 0, numerator = 0, average = 0, mid = 0 , element = 0 ;

    float element_list[50];
    char file[] = "average.dat";

    //ファイルを開く
    if(( fp = fopen( file, "r"  )) == NULL ) {
        printf("file open error!\n");
        exit(EXIT_FAILURE);
    };

    //平均を出す
    while(fgets(s, MAX, fp)){
        //intに変換
        element = atof(s);
        //空行だったらcontinue    一文字目が数字かチェック
        if( element == 0 )
            continue;
        //計算のため数値を配列に入れる
        element_list[element_count] = element;
        //サンプル数をカウントアップ
        element_count++;
// printf("s = %s", s);
printf("element = %f \n", element);
        //合計値
        total += element;
    }
    //サンプル数を標準偏差の分母に
    denominator = element_count;
    average = total / element_count;

    printf("平均 %f / %d = %f \n", total, element_count, average);

    //小さい順に並べ替える
    qsort(element_list, element_count, sizeof(element_list[0]), int_sort);


    for (i = 0; i < element_count; ++i)
    {
        numerator += pow(element_list[i] - average, 2);
        printf("element_list = %f numerator = %f \n", element_list[i], numerator);
    }


    //中央値
    if( element_count % 2 == 0){
        //偶数の場合
        mid = ( element_list[ element_count / 2 ] -1 + element_list[ (element_count  / 2   ) ] ) / 2;
        printf(" element_list[ element_count / 2 ] -1 + element_list[ (element_count  / 2   ) ] = %f\n", element_list[ element_count / 2 ] -1 + element_list[ (element_count  / 2   ) ]  );
    }else{
        //奇数の場合
        mid = ( 1 + element_count ) / 2;
    }

printf("中央値 = %f\n",  mid);



    printf("numerator (%f) / denominator(%f)  = %f\n", numerator  , denominator , numerator  / denominator);
    row = sqrt( numerator  / denominator );

    printf("%f\n", row);

    fclose(fp);

    return 0;
}
