FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .

ARG VITE_BASE_API_URL=/api
ARG PUBLIC_BASE_URL=http://localhost
ENV VITE_BASE_API_URL=${VITE_BASE_API_URL}

RUN sed -i "s|https://BASE_URL|${PUBLIC_BASE_URL}|g" src/data/config.json \
    && npm run build

FROM nginx:stable-alpine-slim
RUN apk upgrade --no-cache
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER 101:101
EXPOSE 80
