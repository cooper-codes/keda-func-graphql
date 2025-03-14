import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import { startServerAndCreateHandler } from "@as-integrations/azure-functions";
import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";
import { KeyvAdapter } from "@apollo/utils.keyvadapter";

import resolvers from "./resolvers";
import { buildFederatedSchema } from "./helpers/buildFederatedSchema";

const schema = buildFederatedSchema({
  resolvers,
});

const cacheOptions =
  Boolean(process.env.USE_LOCAL_CACHE) === true
    ? {}
    : {
        cache: new KeyvAdapter(
          new Keyv({ store: new KeyvRedis("redis://redis") }),
        ),
      };

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [responseCachePlugin(cacheOptions)],
});

export default startServerAndCreateHandler(server);
