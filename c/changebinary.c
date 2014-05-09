# include <stdio.h>
# include <stdlib.h>
# include <sys/stat.h>

int main(int argc, char *argv[])
{

    FILE *fp;
    //file存在チェック用
    struct stat st;

    //引数はファイル名を指定
    char *file = argv[1];

    fp = fopen(file, "wb");

    printf("戻り値チェック: %c\n", stat(file, &st));
    //ファイル存在チェック
    if(stat(file, &st) != 0)
    {
        printf("%sは存在しません\n", file);
        return 0;
    }

    return 0;
}