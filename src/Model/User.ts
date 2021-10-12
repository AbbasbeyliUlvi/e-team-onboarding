import { ObjectType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

import { UserFactory } from "./Factories/UserFactory";

@ObjectType()
export class User {
    @Field()
    id: number

    @Length(3)
    @IsEmail()
    @Field({ nullable: true })
    email: string

    @Length(3)
    @Field({ nullable: true })
    firstName: string

    @Field({ nullable: true })
    lastName: string

    static Factory = UserFactory;
}