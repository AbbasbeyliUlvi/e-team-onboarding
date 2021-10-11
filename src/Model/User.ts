import { ObjectType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

import { UserFactory } from "./Factories/UserFactory";

@ObjectType()
export class User {
    @Field()
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

    static Factory = UserFactory;
}