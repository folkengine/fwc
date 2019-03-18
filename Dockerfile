FROM node:11
COPY . ./app
CMD npm install -g yarn ganache-cli truffle
CMD cd ./app && yarn install
CMD cd ./app && yarn test
CMD bin/bash
