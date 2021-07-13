import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
// import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  // run migrations
  await orm.getMigrator().up();
  // sample post creation
  // const post = orm.em.create(Post, {title: "New post"})
  // orm.em.persistAndFlush(post);

  const app = express();

  // wiring graphql
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }), //graphql gets access to orm
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.status(200).send("Full Stack Typescript");
  });

  app.listen(3030, () => {
    console.log("Server running on PORT:3030");
  });
};

main()
  .then(() => console.log("Setup: passed"))
  .catch(console.error);
