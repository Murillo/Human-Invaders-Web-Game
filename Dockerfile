FROM nginx:1.24.0-alpine

WORKDIR /usr/src/app
COPY index.html ./
COPY Library ./Library

COPY . /usr/share/nginx/html
EXPOSE 80