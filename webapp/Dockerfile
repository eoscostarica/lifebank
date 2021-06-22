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
ENV react_app_eos_api_host $REACT_APP_EOS_API_HOST
ARG react_app_eos_api_port
ENV react_app_eos_api_port $REACT_APP_EOS_API_PORT
ARG react_app_eos_api_protocol
ENV react_app_eos_api_protocol $REACT_APP_EOS_API_PROTOCOL
ARG react_app_eos_chain_id
ENV react_app_eos_chain_id $REACT_APP_EOS_CHAIN_ID
ARG react_app_hasura_url
ENV react_app_hasura_url $REACT_APP_HASURA_URL
ARG react_app_mapbox_access_token
ENV react_app_mapbox_access_token $REACT_APP_MAPBOX_ACCESS_TOKEN
ARG react_captcha_key
ENV react_captcha_key $REACT_CAPTCHA_KEY
ARG react_app_block_explorer_url
ENV react_app_block_explorer_url $REACT_APP_BLOCK_EXPLORER_URL

RUN yarn build

FROM nginx:1.19.0 as run-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]