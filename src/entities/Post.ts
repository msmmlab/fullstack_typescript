import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType() // wiring graphql
@Entity()
export class Post {
  @Field(() => Int) //wiring graphql
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "text" })
  title!: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
