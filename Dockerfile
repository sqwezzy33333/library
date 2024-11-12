FROM node:22.9-alpine
LABEL authors="kornev.se"

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]

