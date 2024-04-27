FROM node:18-alpine

# set work directory
WORKDIR /usr/src/app

COPY /frontend/package.json .

COPY /frontend .

RUN yarn 

EXPOSE 3000

