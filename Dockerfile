FROM node:22.9-alpine
LABEL authors="kornev.se"

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start"]

