# ---------- Base ----------
FROM node:12.16.2 as base
RUN apt-get update
RUN apt-get -y install curl
WORKDIR /app

# ---------- Builder ----------
FROM base AS builder
COPY package.json yarn.lock ./
RUN yarn --ignore-optional
COPY ./src ./src

# ---------- Release ----------
FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
USER node
CMD ["node", "./src/index.js"]