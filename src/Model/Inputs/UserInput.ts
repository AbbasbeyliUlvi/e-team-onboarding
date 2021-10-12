import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class UserInput {
    @Field({ nullable: true })
    id: number

    @Length(3)
    @IsEmail()
    @Field({ nullable: false })
    email: string

    @Length(3)
    @Field({ nullable: true })
    firstName: string

    @Field({ nullable: true })
    lastName: string
}