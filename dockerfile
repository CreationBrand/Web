FROM node:18-alpine as base
WORKDIR /src
COPY package*.json /
EXPOSE 3000
