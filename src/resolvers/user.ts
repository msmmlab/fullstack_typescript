import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Field, InputType, Mutation, Arg, Resolver, Ctx } from "type-graphql";
import argon2 from "argon2";

// @InputType to avois typing many @Arg decorators
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() ctx: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password);
    const user = ctx.em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await ctx.em.persistAndFlush(user);
    return user;
  }
}
