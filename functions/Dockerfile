FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# COPY ./package.json ./package-lock.json ./

# RUN npm config set "strict-ssl" false && \
#     npm install 

# COPY . . 

# RUN npm run build

# RUN npm prune --omit=dev

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node18-appservice
FROM mcr.microsoft.com/azure-functions/node:4-node20

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \
    FUNCTIONS_EXTENSION_VERSION="~4" \
    FUNCTIONS_WORKER_RUNTIME=node

COPY --from=prod-deps /home/site/wwwroot/node_modules /app/node_modules
COPY --from=build /home/site/wwwroot/dist /app/dist
COPY  /functions/graphql/function.json /home/site/wwwroot/graphql/function.json
# COPY --from=builder /home/site/wwwroot/helloworld /home/site/wwwroot/helloworld

COPY package.json host.json /home/site/wwwroot/
