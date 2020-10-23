#include <stdlib.h>
#include <stdio.h>
#include <signal.h>

// Breaking it up prevents it from appearing in `strings`
static char flag_message_1[] = "Fl";
static char flag_message_2[] = "ag";
static char flag_message_3[] = ": ";

static char flag_portion_1[] = "Ml";
static char flag_portion_2[] = "J6";
static char flag_portion_3[] = "Af";
static char flag_portion_4[] = "XT";
static char flag_portion_5[] = "zQ";
static char flag_portion_6[] = "um";

void segv_handler(int signal)
{
	printf(
		"%s%s%s%s%s%s%s%s\n",
		flag_message_1,
		flag_message_2,
		flag_message_3,
		flag_portion_1,
		flag_portion_2,
		flag_portion_3,
		flag_portion_4,
		flag_portion_5,
		flag_portion_6);

	exit(1);
}

int main(int argc, char **argv)
{
	signal(SIGSEGV, segv_handler);

	printf("What is your name:");

	char name[10];
	gets(name);

	printf("You entered: %s", name);
}
