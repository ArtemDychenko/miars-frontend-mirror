FROM node:22 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

CMD ["ng", "serve", "--host", "0.0.0.0"]
