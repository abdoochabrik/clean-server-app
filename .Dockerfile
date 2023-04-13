FROM node:16.17.0-bullseye-slim
WORKDIR /chabrik/app
COPY package*.json ./
#instead of using RUN npm install to avoid installing packages listed in the devDependencies 
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 3002
CMD [ "node","dist/main.js"]

