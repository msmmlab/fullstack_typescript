import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType() // wiring graphql
@Entity()
export class User {
  @Field(() => Int) //wiring graphql
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  username!: string;

  // removed @Field decorator to keep ti private for graphql.
  @Property({ type: "text" })
  password!: string;
}
