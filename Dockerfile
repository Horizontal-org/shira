FROM node:22 AS build

RUN npm install turbo --global

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./apps/public/package*.json ./apps/public/
COPY ./apps/spaces/package*.json ./apps/spaces/
COPY ./packages/shira-ui/package*.json ./packages/shira-ui/
COPY ./packages/tooling-config/package*.json ./packages/tooling-config/

RUN npm ci

COPY . .

ENV TZ=UTC
ENV REACT_APP_API_URL=/backend
ENV REACT_APP_LIBRARY_API_URL=/library-api
ENV REACT_APP_ENABLE_ANALYTICS=no
RUN turbo run build --concurrency=1
RUN find apps/spaces/build apps/public/build -name "*.map" -delete

FROM nginx:1.30.3-alpine

WORKDIR /var/www

COPY --from=build /usr/src/app/apps/public/build ./quiz
COPY --from=build /usr/src/app/apps/spaces/build ./spaces
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
