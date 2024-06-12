FROM mcr.microsoft.com/azure-functions/node:4-node18 as builder

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /home/site/wwwroot

COPY ./package.json ./package-lock.json ./

RUN npm config set "strict-ssl" false && \
    npm install 

COPY . . 

RUN npm run build

RUN npm prune --omit=dev

# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node18-appservice
FROM mcr.microsoft.com/azure-functions/node:4-node18

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \
    FUNCTIONS_EXTENSION_VERSION="~4" \
    FUNCTIONS_WORKER_RUNTIME=node

COPY --from=builder /home/site/wwwroot/node_modules /home/site/wwwroot/node_modules
COPY --from=builder /home/site/wwwroot/dist /home/site/wwwroot/dist
COPY --from=builder /home/site/wwwroot/graphql/function.json /home/site/wwwroot/graphql/function.json
# COPY --from=builder /home/site/wwwroot/helloworld /home/site/wwwroot/helloworld

COPY package.json host.json /home/site/wwwroot/
