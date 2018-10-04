FROM node:10.11 as build

ENV NODE_ENV=production
RUN yarn global add parcel-bundler

WORKDIR /root
COPY . .
RUN yarn install
RUN parcel build src/index.html --no-source-maps


RUN curl https://getcaddy.com | bash -s personal
RUN ls

FROM scratch as runtime

COPY --from=build /usr/local/bin /usr/bin
COPY --from=build /root/dist /var/www
COPY Caddyfile /etc/Caddyfile

EXPOSE 80 443 2015
ENTRYPOINT ["/usr/bin/caddy", "--conf", "/etc/Caddyfile", "--log", "stdout"]
