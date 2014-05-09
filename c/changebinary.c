# include <stdio.h>
# include <stdlib.h>
# include <sys/stat.h>

int main(int argc, char *argv[])
{

    FILE *fp;
    //file存在チェック用
    struct stat st;
    //読み込みバッファ。binaryが入ってる
    int inbuf;
    //書き込みバッファ
    int outbuf;

    //引数はファイル名を指定
    char *file = argv[1];

    printf("戻り値チェック: %d\n", stat(file, &st));

    //ファイル存在チェック。エラーの場合は-1
    if(stat(file, &st) != 0)
    {
        printf("%sは存在しません\n", file);
        return 0;
    }

    //バイナリ形式で開く
    fp = fopen(file, "rb");

    //1行読み込む
    fread(&inbuf, sizeof( file ), 1, fp);

    //バイナリ形式で出力
    printf("%d\n", inbuf);

    //inbufを別のファイルに書き込む

    fclose(fp);

    return 0;
}