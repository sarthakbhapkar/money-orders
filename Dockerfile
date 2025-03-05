FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY /db /db
COPY . .
EXPOSE 5000
CMD ["node","server.js"]


