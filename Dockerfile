FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run server:build
RUN npm run build:react

EXPOSE 5000

CMD ["npm","start"]