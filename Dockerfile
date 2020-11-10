FROM node:12.16.0-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

USER node

EXPOSE 80

CMD ["npm", "start"]

