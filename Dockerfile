FROM node:12

WORKDIR /appClub

COPY package*.json ./ 

RUN npm install

COPY . .

CMD ["node", "index.js"]