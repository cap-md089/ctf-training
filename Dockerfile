FROM gcc as builder

RUN apt update && apt install zip

WORKDIR /usr/ctf

ADD binary-challenges/buffer-overflow ./buffer-overflow
ADD forensics-challenges ./forensics-challenges

WORKDIR /usr/ctf/buffer-overflow
RUN mkdir out && make

WORKDIR /usr/ctf/forensics-challenges
RUN mkdir out && make

FROM node

WORKDIR /usr/ctf

ADD crypto-challenges ./crypto-challenges
ADD flag-input ./flag-input
ADD python-challenges ./python-challenges
ADD package.json ./package.json
ADD yarn.lock ./yarn.lock

RUN mkdir /usr/ctf/flag-input/downloads

COPY --from=builder /usr/ctf/buffer-overflow/out/binary.zip /usr/ctf/flag-input/downloads/binary1.zip
COPY --from=builder /usr/ctf/forensics-challenges/out /usr/ctf/flag-input/downloads

RUN yarn install

WORKDIR /usr/ctf/flag-input

CMD node index.js
