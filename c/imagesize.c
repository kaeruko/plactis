# include <stdio.h>
# include <stdlib.h>
# include <sys/stat.h>

#define BUFSIZE 24
int getSize(unsigned char *buf, int *width, int *height, int *sizetype);

int main(int argc, char *argv[])
{
    FILE *fp;
    //file存在チェック用
    struct stat st;
    //読み込みバッファ。binaryが入ってる
    unsigned char buf[BUFSIZE];
    int count;

    int width;
    int height;
    int sizetype;

    //引数はファイル名を指定
    char *file = argv[1];

    if(argc < 2)
    {
        printf("usage: imagesize FILE \n");
        return 1;
    }

    //ファイル存在チェック。エラーの場合は-1
    if(stat(file, &st) != 0)
    {
        printf("%sは存在しません\n", file);
        return 2;
    }

    //バイナリ形式で開く
    fp = fopen(file, "rb");

    count = fread(&buf, sizeof( unsigned char ), BUFSIZE, fp);

    getSize(buf, &width, &height, &sizetype);

    switch(sizetype){
        case 1:
            printf("gifです\n");
            break;
        case 2:
            printf("pngです\n");
            break;
        default:
        break;
    }

    printf("width: %d \n", width);
    printf("height %d \n", height);

    fclose(fp);

    return 0;
}

int getSize(unsigned char *buf, int *width, int *height, int *sizetype)
{
    //type gif
   if((buf[0]==0x47) && (buf[1]==0x49) && (buf[2]==0x46) && (buf[3]==0x38) ){
        *sizetype = 1;
        *width = (buf[7] * 256) + (buf[6] * 1);
        *height = (buf[9] * 256) + (buf[8] * 1);
   }

   //type png
   if((buf[0]==0x89) && (buf[1]==0x50) && (buf[2]==0x4e) && (buf[3]==0x47) ){
        *sizetype = 2;
        *width = (buf[16] * 0x1000000) + (buf[17] * 0x10000) + (buf[18] * 0x100) + (buf[19]);
        *height = (buf[20] * 0x1000000) + (buf[21] * 0x10000) + (buf[22] * 0x100) + (buf[23]);
   }
    return 0;
}
