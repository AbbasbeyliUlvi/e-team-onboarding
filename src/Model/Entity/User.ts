import { IsEmail, Length } from "class-validator";
import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { UserFactory } from "../Factories/UserFactory";

@Entity()
@ObjectType()
export class User {

    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Length(3)
    @IsEmail()
    @Field({ nullable: true })
    @Column()
    email: string

    @Length(3)
    @Field({ nullable: true })
    @Column()
    firstName: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    lastName: string

    static Factory = UserFactory;
}