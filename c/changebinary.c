# include <stdio.h>
# include <stdlib.h>

int main(int argc, char const *argv[])
{

    FILE *fp;
    //引数はファイル名を指定
//    char file[256] = argv[1];
    char file[256] = "aaa.txt";
    //引数にファイルを指定する
    printf("%s\n", argv[1]);

    fp = fopen(file, "wb");


    return 0;
}