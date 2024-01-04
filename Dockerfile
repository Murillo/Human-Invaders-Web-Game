FROM nginx:1.24.0-alpine

COPY src/ /usr/share/nginx/html
EXPOSE 80