import { InputType, Field } from "type-graphql";
import { UserInput } from "./UserInput";

@InputType()
export class BlogPostInput {
    @Field({ nullable: true })
    id: number

    @Field({})
    title: String

    @Field({ nullable: true })
    content: String

    @Field({ simple: false, nullable: true })
    user: UserInput
}