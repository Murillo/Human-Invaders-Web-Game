# BUILDER
FROM node:24-alpine AS builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# SERVE
FROM nginx:1.24.0-alpine as serve
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
