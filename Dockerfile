# build stage
FROM node:lts-alpine as builder

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .

RUN yarn global add http-server
RUN yarn

COPY . .

RUN yarn build

# production stage
FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/conf.d/poolc.org.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
