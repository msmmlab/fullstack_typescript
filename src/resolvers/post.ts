import { Post } from "../entities/Post";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.em.find(Post, {});
  }

  // @Query(() => Post, { nullable: true })
  // post(
  //   @Arg("id", () => Int) id: number,
  //   @Ctx() ctx: MyContext
  // ): Promise<Post | null> {
  //   return ctx.em.findOne(Post, { id: id });
  // }
  @Query(() => Post, { nullable: true }) //query for searching db.
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    return ctx.em.findOne(Post, { id: id });
  }

  @Mutation(() => Post) //mutation for creating and modifing records
  async createPost(
    @Arg("title") title: string,
    @Ctx() ctx: MyContext
  ): Promise<Post> {
    const post = ctx.em.create(Post, { title });
    await ctx.em.persistAndFlush(post);
    return post;
  }
}
