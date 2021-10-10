import { ObjectType, Field } from "type-graphql";
import { BlogPostFactory } from "./Factories/BlogPostFactory";
import { User } from "./User";

@ObjectType()
export class BlogPost {
    @Field()
    id: number

    @Field({})
    title: String

    @Field({ nullable: true })
    content: String

    @Field({ simple: true, nullable: true })
    author?: User

    static Factory = BlogPostFactory;
}