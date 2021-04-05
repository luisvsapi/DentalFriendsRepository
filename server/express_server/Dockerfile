FROM node:12.22.0-alpine3.12
ENV NODE_ENV=producton
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD [ "node", "./bin/www" ]
