FROM node:lts as installer
WORKDIR /app

COPY package.json yarn.lock .npmrc ./
RUN yarn build