import "reflect-metadata";
import fs from "fs";
import path from "path";
import { printSchemaWithDirectives } from "@graphql-tools/utils";

import { buildFederatedSchema } from "./buildFederatedSchema";
import resolvers from "../resolvers";

const schema = buildFederatedSchema({
  resolvers,
});

fs.writeFileSync(
  path.resolve(__dirname, "../../schema.gql"),
  printSchemaWithDirectives(schema),
);

process.exit(0);
