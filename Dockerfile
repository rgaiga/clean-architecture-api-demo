FROM node:20.11.0-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20.11.0-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV SERVER_PORT=3000

COPY package*.json ./

RUN npm ci

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE $SERVER_PORT

CMD ["node", "./dist/main/server.js"]
