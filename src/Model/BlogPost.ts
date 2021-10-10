import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class BlogPost {

    @Field()
    title: String

    @Field()
    content: String
}