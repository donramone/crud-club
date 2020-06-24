FROM node:12-alpine

WORKDIR /appClub

COPY package*.json ./ 

RUN npm install

COPY . .

CMD ["node", "index.js"]