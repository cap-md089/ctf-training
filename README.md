# MD-089 CTF Training

This repository holds different challenges that can be used solely for training purposes, and as such follows an honor system. This repository is not meant to keep secrets. It is not meant to be used in a competition.

## Types of challenges

This repository contains the following types of challenges

-   Crypto
    A crypto challenge involves some code breaking, and encourages familiarity with different encodings, hashes, and basic cryptography.
-   Web
    A web challenge includes a web server that has some secret hidden within. The challenge is to gain unauthorized access to different parts of the web server and try to find a secret within.
-   Binary exploitation
    A local executable challenge includes downloading and manipulating an executable file to try to encourage it to print out a flag.
-   Forensics
    A steganography challenge includes downloading a file and finding hidden information within a binary file, such as an image or executable.
-   Programming
    A programming challenge is used to practice writing Python programs.

## Resources

All of the crypto and web challenges are runnable from a web browser. Other challenges will use the following programs:

-   GDB
-   BVi
-   strings
-   Python 3

The best way to use these resources is to go into the [resources](./resources) folder and build the Dockerfile located in that folder.

The build command is simply `docker build -t ctf:ubuntu19.0 .`. Commands to run the image are located in the Dockerfile. Once running, execute bash in the image with `docker exec -it ctf bash` and change directory into `/pwd`. There, you will be able to work with the files placed in there from the host computer.

This also is the safest way to run the challenges, as no one should be downloading executable files and directly running them on their own computers. Running them in an isolated environment (e.g., Docker, VMs) is the best way to do so.

## Using this repository

Using this repository requires Docker and Docker Compose to be installed. Once that is done, follow these steps:

1. Download this repository
2. Run `docker-compose up` inside the repository
3. Go to [localhost](http://localhost)

**NOTE:** This repository is meant to be put inside of an Ubuntu Virtual Machine for distribution, inside of a virtual machine that is created for the sole purpose of performing this CTF challenge. As such, `docker-compose.yml` assumes that the Docker images are meant to be run constantly and start whenever the computer starts. If this is undesired, you will need to remove `restart: always` from each of the container definitions in `docker-compose.yml`
