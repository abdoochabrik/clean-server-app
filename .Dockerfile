FROM node:16.17.0-bullseye-slim
WORKDIR /chabrik/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3002
CMD [ "node","dist/main.js"]

