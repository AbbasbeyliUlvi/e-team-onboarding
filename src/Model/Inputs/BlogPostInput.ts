import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { UserInput } from "./UserInput";

@InputType()
export class BlogPostInput {
    @Field({ nullable: true })
    id: number

    @Length(3, 30)
    @Field({ nullable: false })
    title: String

    @Field({ nullable: true })
    content: String

    @Field({ simple: false, nullable: true })
    user: UserInput
}