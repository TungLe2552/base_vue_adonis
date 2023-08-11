FROM node:18-alpine AS build-stage
RUN apk add g++ make py3-pip
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run build
WORKDIR /app/build
CMD npm run start

FROM nginx:stable-alpine as production-stage
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/
EXPOSE 80

