#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

const long long max_size = 2000;         // max length of strings
const long long N = 40;                  // number of closest words that will be shown
const long long max_w = 50;              // max length of vocabulary entries

int main(int argc, char **argv) {
	FILE *f;
	char st1[max_size];
	char *bestw[N];
	char file_name[max_size], st[100][max_size], save_file_name[max_size];
	float dist, len, bestd[N], vec[max_size];
	long long words, size, a, b, c, d, cn, bi[100];
	char ch;
	float *M;
	char *vocab;

    strcpy(file_name, argv[1]);
    strcpy(save_file_name, argv[2]);

    printf("\nbinary to txt: %s -> %s\n", file_name, save_file_name);

	f = fopen(file_name, "rb");
    FILE *fo = fopen(save_file_name, "wb");

	fscanf(f, "%lld", &words);
	fscanf(f, "%lld", &size);
	vocab = (char *)malloc((long long)words * max_w * sizeof(char));
	for (a = 0; a < N; a++) {
		bestw[a] = (char *)malloc(max_size * sizeof(char));
	}

	M = (float *)malloc((long long)words * (long long)size * sizeof(float));
	
	if (M == NULL) {
		printf("Cannot allocate memory: %lld MB    %lld  %lld\n", (long long)words * size * sizeof(float) / 1048576, words, size);
		return -1;
	}

	for (b = 0; b < words; b++) {
		a = 0;
		while (1) {
			vocab[b * max_w + a] = fgetc(f);
			if (feof(f) || (vocab[b * max_w + a] == ' ')) break;
			if ((a < max_w) && (vocab[b * max_w + a] != '\n')) {
				a++;
			}
		}

		for (a = 0; a < size; a++) {
			fread(&M[a + b * size], sizeof(float), 1, f);
		}

		len = 0;
		for (a = 0; a < size; a++) {
			len += M[a + b * size] * M[a + b * size];
		}

		len = sqrt(len);
		for (a = 0; a < size; a++) {
			M[a + b * size] /= len;
		}
	}

	fclose(f);

	int i = 0;
	for (b = 0; b < words-1; b++) {
	    printf("%cprocess: %lld/%lld", 13, b, (words-1));
	    fflush(stdout);
		a = 0;
		while (1) {
			if (vocab[b * max_w + a] == ' ') break;
			if ((a < max_w) && (vocab[b * max_w + a] != '\n')) {
				a++;
			}
		}
		
		for(i=0;i<=a;i++) {
			fprintf(fo, "%c", vocab[b * max_w + i]);
		}
		fprintf(fo, "[");

		for (a = 0; a < size - 1 ; a++) {
			fprintf(fo, "%f,", M[a + b * size]);
		}
		fprintf(fo, "%f]\n", M[size - 1 + b * size]);
	}

	b = words - 1;
	printf("%cprocess: %lld/%lld\n", 13, b, (words-1));
	fflush(stdout);
	a = 0;
	while (1) {
		if (vocab[b * max_w + a] == ' ') break;
		if ((a < max_w) && (vocab[b * max_w + a] != '\n')) {
			a++;
		}
	}

	for(i=0;i<=a;i++) {
		fprintf(fo, "%c", vocab[b * max_w + i]);
	}
	fprintf(fo, "[");

	for (a = 0; a < size - 1 ; a++) {
		fprintf(fo, "%f,", M[a + b * size]);
	}
	fprintf(fo, "%f]", M[size - 1 + b * size]);

    fclose(fo);
	return 0;
}