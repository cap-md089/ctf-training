COMPILE := gcc -g -c -fno-stack-protector
LINK := gcc -fno-stack-protector

out/binary.zip: out/program README.md
	zip -j out/binary.zip README.md out/program

out/program: out/main.o
	$(LINK) out/main.o -o out/program

out/main.o:
	$(COMPILE) src/main.c -o out/main.o

clean:
	rm -rf out/*