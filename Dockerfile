FROM node:10.11 as build

ARG API_KEY
ARG API_URL

ENV NODE_ENV production

WORKDIR /root
COPY ./src ./src
COPY ./dist ./dist
COPY package.json .
COPY yarn.lock .

RUN yarn install --non-interactive --frozen-lockfile
RUN yarn build


RUN curl https://getcaddy.com | bash -s personal
RUN ls

FROM scratch as runtime

COPY --from=build /usr/local/bin /usr/bin
COPY --from=build /root/dist /var/www
COPY Caddyfile /etc/Caddyfile

EXPOSE 80 443 2015
ENTRYPOINT ["/usr/bin/caddy"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout"]
