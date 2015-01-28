#include <stdio.h>
#include <netdb.h>
extern int h_errno;
/**
 * gethostbynameを使って正引きする
 * 参照
 * http://d.hatena.ne.jp/mozxxx/20110512
 */
int main(int argc, char *argv[]){

	char *hostname;
	struct hostent *hostent;
	int i,j;
	char *err_mess = "";

	if(argc == 1) {
		return 1;
	}

	for(i=1; i < argc; i++) {
		hostname = argv[i];
		hostent = gethostbyname(hostname);

		if(hostent == NULL) {
			switch(h_errno) {
				case HOST_NOT_FOUND:
					err_mess = "host not found";
					break;
				case NO_ADDRESS:
					err_mess = "no address";
					break;
				case NO_RECOVERY:
					err_mess = "no recovery";
					break;
				case TRY_AGAIN:
					err_mess = "try again";
					break;
				default:
					err_mess = "unknown error";
			}
			printf("error %d %s\n", h_errno, err_mess);
			return 1;
		}

		printf("h_name: %s\n", hostent->h_name);
		printf("h_aliases\n");
		for (int j = 0; hostent->h_aliases[j] != NULL; ++j)
		{
			printf("\t%s\n", hostent->h_aliases[j]);
		}
		printf("h_addrtype : %d\n", hostent->h_addrtype);
		printf("h_length : %d\n", hostent->h_length);

		printf("h_addr_list :\n");
		for (int j = 0; hostent->h_addr_list[j] != NULL  ; ++j)
		{
			for (int u = 0; u < hostent->h_length ; ++u)
			{
				if(u < hostent->h_length - 1) {
					printf("%u.", hostent->h_addr_list[j][u]& 0xff);
				}else{
					printf("%u\n", hostent->h_addr_list[j][u]& 0xff);
				}
			}
		}
	}

}

