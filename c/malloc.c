#include <stdio.h>
#include <stdlib.h>
#include "foosan.h"

int main(void)
{
int test;

    int i;
    int *heap;
    heap = (int *)malloc(sizeof(int) * 10);
    if(heap == NULL) exit(0);

    for (i = 0; i < 10; ++i)
    {
        heap[i] = i;
    }

    printf("%d\n", heap[5]);
    free(heap);
    printf("foo = %d\n", foo(i));
    return 0;
}


