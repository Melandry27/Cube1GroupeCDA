FROM node:22-alpine3.22 AS api

LABEL org.opencontainers.image.source=https://github.com/Melandry27/Cube1GroupeCDA
WORKDIR /app
COPY package*.json ./
COPY database ./database

RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
# COPY docker/express/entrypoint.sh /usr/local/bin/entrypoint
# RUN chmod +x /usr/local/bin/entrypoint
# ENTRYPOINT ["entrypoint"]

CMD ["npm", "start"]
