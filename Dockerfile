FROM node:latest

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock  /app/
RUN yarn install

COPY . /app/

EXPOSE 3000
CMD [ "yarn", "dev" ]