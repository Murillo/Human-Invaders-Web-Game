# BUILDER
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# SERVE
FROM nginx:1.24.0-alpine as serve
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80