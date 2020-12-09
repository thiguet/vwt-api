FROM node:alpine

WORKDIR /usr/app
COPY package*.json ./
RUN npm install --only=prod
COPY ./dist .
ENV PORT=8080
EXPOSE 8080

CMD [ "node", "index.js" ]