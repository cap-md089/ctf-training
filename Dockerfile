FROM node:13

WORKDIR /usr/ctf

ADD . ./

WORKDIR /usr/ctf/flag-input

RUN yarn install

CMD node index.js
