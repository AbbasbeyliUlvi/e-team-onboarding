import { ObjectType, Field } from "type-graphql";
import { Length } from "class-validator";

import { BlogPostFactory } from "./Factories/BlogPostFactory";
import { User } from "./User";

@ObjectType()
export class BlogPost {
    @Field()
    id: number

    @Length(3, 30)
    @Field({ nullable: true })
    title: string

    @Field({ nullable: true })
    content: string

    @Field({ simple: true, nullable: true })
    user?: User

    static Factory = BlogPostFactory;
}