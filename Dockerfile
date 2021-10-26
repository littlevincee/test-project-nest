FROM node:16.8.0

WORKDIR /app

COPY package.json wait-for-it.sh ./

RUN yarn install

RUN chmod +x wait-for-it.sh

COPY /dist .
COPY . .

ENV NODE_ENV=production
ENV MONGODB_HOST=mongo
ENV MONGODB_Database=testdb
ENV PORT 3001
ENV NUMVERIFY_API_KEY=5c67740facd28d133de9cc5e749aa200
ENV MAILBOXLAYER_API_KEY=723da77398c89fd6234d19a3bcdb73f5

EXPOSE $PORT

CMD  ./wait-for-it.sh mongo:27017 --timeout=1000 -- ./start.sh