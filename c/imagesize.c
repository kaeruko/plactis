# include <stdio.h>
# include <stdlib.h>
# include <sys/stat.h>

int getSize(unsigned char *buf, int *width, int *height);

int main(int argc, char *argv[])
{
    FILE *fp;
    //file存在チェック用
    struct stat st;
    //読み込みバッファ。binaryが入ってる
    unsigned char buf[1000000];
    int count;

    int width;
    int height;

    //引数はファイル名を指定
    char *file = argv[1];

    //ファイル存在チェック。エラーの場合は-1
    if(stat(file, &st) != 0)
    {
        printf("%sは存在しません\n", file);
        return 0;
    }

    //バイナリ形式で開く
    fp = fopen(file, "rb");

    count = fread(&buf, sizeof( unsigned char ), 1000000, fp);

    printf("count %d\n", count);

    getSize(buf, &width, &height);

    printf("width: %d \n", width);
    printf("height %d \n", height);

    fclose(fp);

    return 0;
}

int getSize(unsigned char *buf, int *width, int *height)
{
    *width = (buf[7] * 256) + (buf[6] * 1);
    *height = (buf[9] * 256) + (buf[8] * 1);

    return 0;
}
