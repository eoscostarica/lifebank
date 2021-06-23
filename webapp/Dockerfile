FROM node:12.16.2-slim as build-stage

ENV WORK_DIR /app
ENV PATH $WORK_DIR/node_modules/.bin:$PATH
ENV NODE_ENV production
ENV NODE_PATH ./src

RUN mkdir -p $WORK_DIR
WORKDIR $WORK_DIR

COPY package.json $WORK_DIR/package.json
COPY yarn.lock $WORK_DIR/yarn.lock

RUN yarn install --production=false

COPY ./ $WORK_DIR

# setup build environment
ARG react_app_eos_api_host
ENV REACT_APP_EOS_API_HOST $react_app_eos_api_host
ARG react_app_eos_api_port
ENV REACT_APP_EOS_API_PORT $react_app_eos_api_port
ARG react_app_eos_api_protocol
ENV REACT_APP_EOS_API_PROTOCOL $react_app_eos_api_protocol
ARG react_app_eos_chain_id
ENV REACT_APP_EOS_CHAIN_ID $react_app_eos_chain_id
ARG react_app_hasura_url
ENV REACT_APP_HASURA_URL $react_app_hasura_url
ARG react_app_mapbox_access_token
ENV REACT_APP_MAPBOX_ACCESS_TOKEN $react_app_mapbox_access_token
ARG react_captcha_key
ENV REACT_CAPTCHA_KEY $react_captcha_key
ARG react_app_block_explorer_url
ENV REACT_APP_BLOCK_EXPLORER_URL $react_app_block_explorer_url

RUN yarn build

FROM nginx:1.19.0 as run-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]