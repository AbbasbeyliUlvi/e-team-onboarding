import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {
    @Field({ nullable: true })
    id: number

    @Field({})
    email: String

    @Field({ nullable: true })
    firstName: String

    @Field({ nullable: true })
    lastName: String
}