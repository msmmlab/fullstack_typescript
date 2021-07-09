import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to folder with migration files
    pattern: /^[\w-]+\d+\.[jt]s$/, // how to match migration files
    disableForeignKeys: false,
  },
  entities: [Post],
  dbName: "fstack",
  user: "djerq",
  password: "12345678",
  type: "postgresql",
  debug: process.env.NODE_ENV !== "production",
} as Parameters<typeof MikroORM.init>[0];
