FROM node:12.16.2 as build-stage

ARG react_app_api_entrypoint

ENV WORK_DIR /app
ENV PATH $WORK_DIR/node_modules/.bin:$PATH
ENV NODE_ENV production
ENV NODE_PATH ./src

RUN mkdir -p $WORK_DIR
WORKDIR $WORK_DIR

COPY package.json $WORK_DIR/package.json
COPY yarn.lock $WORK_DIR/yarn.lock

RUN yarn install --frozen-lockfile --production=true

COPY ./ $WORK_DIR

RUN yarn build

FROM nginx:latest as run-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

