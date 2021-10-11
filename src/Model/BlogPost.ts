import { ObjectType, Field } from "type-graphql";
import { Length } from "class-validator";

import { BlogPostFactory } from "./Factories/BlogPostFactory";
import { User } from "./User";

@ObjectType()
export class BlogPost {
    @Field()
    id: number

    @Length(3, 30)
    @Field({ nullable: false })
    title: String

    @Field({ nullable: true })
    content: String

    @Field({ simple: true, nullable: true })
    author?: User

    static Factory = BlogPostFactory;
}