import { InputType, Field } from "type-graphql";

@InputType()
export class BlogPostInput {
    
    @Field()
    title: String

    @Field()
    content: String
}