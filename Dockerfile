FROM node:12.16.1-alpine3.9
RUN mkdir /app
WORKDIR /app
COPY . /app