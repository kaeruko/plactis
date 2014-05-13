# include <stdio.h>
# include <stdlib.h>
# include <sys/stat.h>

int main(int argc, char *argv[])
{
    FILE *fp;
    //file存在チェック用
    struct stat st;
    //読み込みバッファ。binaryが入ってる
    unsigned char buf[100000000];
    int count;

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

    count = fread(&buf, sizeof( unsigned char ), 100000000, fp);

    printf("%d\n", count);

    printf("width: %d \n", (buf[7] * 256) + (buf[6] * 1));
    printf("height %d \n", (buf[9] * 256) + (buf[8] * 1));

    fclose(fp);

    return 0;
}