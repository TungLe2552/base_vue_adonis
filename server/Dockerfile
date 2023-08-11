FROM node:18-alpine AS build-stage
RUN apk add g++ make py3-pip
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run build
WORKDIR /app/build
CMD npm run start
