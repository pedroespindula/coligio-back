FROM node:12.16.0-alpine

WORKDIR /app

EXPOSE 80

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package*.json ./

RUN npm install --no-optional --verbose

COPY . .

CMD ["npm", "start"]

