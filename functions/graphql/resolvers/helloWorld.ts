import { Query, Resolver } from "type-graphql";
import { CacheControl } from "../cacheControl";

const timeout = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

@Resolver()
class HelloWorldResolver {
  @Query(() => String)
  @CacheControl({ maxAge: 15 })
  async hello() {
    await timeout(350);

    return "world";
  }
}

export default HelloWorldResolver;
