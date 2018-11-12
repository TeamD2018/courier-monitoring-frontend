FROM node:10.12-alpine as build

ARG API_KEY
ARG API_URL

RUN apk --update add ca-certificates curl bash

WORKDIR /root
COPY ./src ./src
COPY package.json .
COPY webpack.config.js .
COPY .babelrc .
COPY yarn.lock .

RUN yarn install --non-interactive --frozen-lockfile
RUN yarn build

RUN curl https://getcaddy.com | bash -s personal


FROM scratch as runtime

COPY --from=build /usr/local/bin /usr/bin
COPY --from=build /root/dist /var/www
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
ENV CADDYPATH /root/.caddy

EXPOSE 80 443 8080
ENTRYPOINT ["/usr/bin/caddy"]
CMD ["--conf", "/etc/caddy/Caddyfile","-agree", "--log", "stdout"]
