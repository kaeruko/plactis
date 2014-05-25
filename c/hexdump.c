# include <stdio.h>
# include <string.h>
#include <ctype.h>

# define BUFSIZE 16

void makeOutfile(char *input, char *outfile);

int main(int argc, char *argv[])
{
    FILE *fp;
    FILE *outfp;

    int count,i, throughNumber, i2;

    char outfile[30];
    unsigned char buf[BUFSIZE];

    char ascii[20];

    throughNumber = 0;
    //引数が来ていない場合はusageを表示して終了
    if(argc < 2){
        printf("usage: imagesize <file>\n");
        return 1;
    }

    //引数で渡って来たファイルをfopen
    char *file = argv[1];
    makeOutfile(file, outfile);

    //16bitごとに取得
    fp = fopen(file , "rb");
    outfp = fopen(outfile, "wb");

    while(!feof(fp)){

        //1文字ごとにbufに格納
        count = fread( &buf,  sizeof( unsigned char )  , BUFSIZE, fp  );
printf("c1: %d ",  count);
        if(count == 0 )break;
printf("c2: %d ",  count);

       printf("%08x  ", throughNumber);
        for (i = 0; i < BUFSIZE; ++i)
        {
            if(i >= count){
               printf("** ");
            }else{
               fprintf(outfp, "%02x", buf[i]);
               printf("%02x ", buf[i]);
                ascii[i] = buf[i];
            }

            throughNumber++;
        }

        printf("  |");
        for (i2 = 0; i2 < count; ++i2)
        {
            if(isprint(ascii[i2])){
               printf("%c", ascii[i2]);
            }else{
                printf(".");
            }
        }
        printf("|");

        printf("\n");
        fprintf(outfp, "\n");
    }
    printf("%08x \n", throughNumber);

    //fclose
    fclose(fp);
    fclose(outfp);

    return 0;
}


void makeOutfile(char *input, char *outfile ){

    int inputcounter, i;

    //拡張子があるかチェック
    int checkext;

    //outputファイル名を生成
    strcpy(outfile, input);

    //inputファイルの文字数
    inputcounter = strlen(input);
    for (i = 0; i < inputcounter; ++i)
    {
        if( outfile[i] ==  '.' ){
            checkext = 1;
            strcpy(outfile+i+1, "out"  );
        }
    }

    //拡張子が見つからなかった場合
    if(checkext != 1){
        strcat(outfile, ".out");
    }

}