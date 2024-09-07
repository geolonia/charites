FROM node:18-slim

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g .
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]