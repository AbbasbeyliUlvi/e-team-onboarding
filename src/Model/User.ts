import { ObjectType, Field } from "type-graphql";
import { UserFactory } from "./Factories/UserFactory";

@ObjectType()
export class User {
    @Field()
    id: number

    @Field({})
    email: String

    @Field({ nullable: true })
    firstName: String

    @Field({ nullable: true })
    lastName: String

    static Factory = UserFactory;
}