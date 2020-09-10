# Based off of:
# https://github.com/LiveOverflow/pwn_docker_example/blob/master/ctf/Dockerfile 

# docker build -t ctf:ubuntu19.10 .
# If using Windows
      # docker run --rm -v %cd%:/pwd --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -d --name ctf -i ctf:ubuntu19.10
# If using Linux    
      # docker run --rm -v $PWD:/pwd --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -d --name ctf -i ctf:ubuntu19.10
# docker exec -it ctf /bin/bash

FROM ubuntu:19.10
ENV LC_CTYPE C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive
RUN dpkg --add-architecture i386 && \
apt-get update && \
apt-get install -y build-essential \
	bvi \
	curl \
	dnsutils \
	gcc \
	gcc-multilib \
	gdb \
	gdb-multiarch \
	git \
	jq \
	libc6:i386 \
	libdb-dev \
	libncurses5:i386 \
	libpcre3-dev \
	libssl-dev \
	libffi-dev \
	libstdc++6:i386 \
	libxaw7-dev \
	libxt-dev \
	ltrace \
	make \
	netcat \
	net-tools \
	procps \
	python \
	python-pip \
	python3 \
	python3-pip \
	python3-dev \
	rubygems \
	strace \
	vim \
	wget \
&& \
pip3 install pwntools && \
mkdir tools && cd tools && \
cd .. && git clone https://github.com/pwndbg/pwndbg && cd pwndbg && git checkout stable && ./setup.sh
