#include <stdio.h>

int rev(int x)
{
    int y = 0;
    printf("rev(int x = %d) before \n", x);
    if( x < 1 ) return 0;
    y = rev(x - 1);
    printf("rev(int x = %d) after \n", x);
    return y;
}


int main(void)
{
    char test[] = "aaaaaaaaaaaaaa";
    rev(3);
    printf("%s\n", test);
}
