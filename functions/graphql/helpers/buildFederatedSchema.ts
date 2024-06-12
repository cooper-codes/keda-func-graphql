import {
  type BuildSchemaOptions,
  createResolversMap,
  buildSchemaSync,
} from "type-graphql";
import { gql } from "graphql-tag";
import deepMerge from "lodash.merge";
import { buildSubgraphSchema } from "@apollo/subgraph";
import {
  type IResolvers,
  printSchemaWithDirectives,
} from "@graphql-tools/utils";

export function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, "skipCheck">,
  referenceResolvers?: IResolvers
) {
  // build TypeGraphQL schema
  const schema = buildSchemaSync({
    ...options,
    skipCheck: true, // disable check to allow schemas without query, etc.
    nullableByDefault: false,
  });

  const cacheControlDirective = gql`
    directive @cacheControl(
      maxAge: Int
      scope: CacheControlScope
    ) on OBJECT | FIELD | FIELD_DEFINITION

    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }
  `;

  // build Apollo Subgraph schema
  const federatedSchema = buildSubgraphSchema({
    typeDefs: gql`
      extend schema
        @link(
          url: "https://specs.apollo.dev/federation/v2.3"
          import: [
            "@key"
            "@shareable"
            "@provides"
            "@extends"
            "@requires"
            "@external"
            "@interfaceObject"
          ]
        )
      ${cacheControlDirective}
      ${printSchemaWithDirectives(schema)}
    `,
    // merge schema's resolvers with reference resolvers
    resolvers: deepMerge(createResolversMap(schema) as any, referenceResolvers),
  });

  return federatedSchema;
}
