#include <stdio.h>
#include <stdlib.h>

int main(int argc, char const *argv[])
{

    int  i = 0;

    for (i = 0; i < 20; ++i)
    {

        printf("%f\n", rand() / ( RAND_MAX + 1.0  ) * 3  + 2 );
        /* code */
    }

    return 0;
}