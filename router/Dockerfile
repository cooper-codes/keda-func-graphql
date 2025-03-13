FROM node:18-alpine as build

COPY package.json yarn.lock ./

RUN yarn config set "strict-ssl" false && yarn

COPY . .

RUN yarn build

RUN yarn --production --ignore-scripts

FROM gcr.io/distroless/nodejs:18

WORKDIR /app

COPY --from=build /node_modules ./node_modules
COPY --from=build /build ./build
COPY --from=build package.json router.yaml ./

CMD ["build/index.js"]