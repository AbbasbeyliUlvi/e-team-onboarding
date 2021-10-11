import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class UserInput {
    @Field({ nullable: true })
    id: number

    @Length(3)
    @IsEmail()
    @Field({ nullable: false })
    email: String

    @Length(3)
    @Field({ nullable: true })
    firstName: String

    @Field({ nullable: true })
    lastName: String
}