import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

console.log("Attempting to introspect...");

const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [{ name: "hello", url: "http://internal-router/api/graphql" }],
});

if (!supergraphSdl) {
  console.warn("Failed to make supergraph. Exiting...");
  process.exit(1);
}

const gateway = new ApolloGateway({ supergraphSdl });

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

// Note the top-level `await`!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);
