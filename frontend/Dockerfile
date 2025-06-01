FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
ENV FAST_REFRESH=true
ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["npm", "run", "dev"]
