FROM node:12 AS builder
WORKDIR /app

RUN npm install react-scripts -g --silent
COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

FROM node:12
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "3000", "-s", "."]