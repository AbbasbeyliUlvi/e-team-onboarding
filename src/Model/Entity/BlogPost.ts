import { Length } from "class-validator";
import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { BlogPostFactory } from "../Factories/BlogPostFactory";
import { User } from "./User";

@Entity()
@ObjectType()
export class BlogPost {

    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Length(3, 30)
    @Field({ nullable: true })
    @Column()
    title: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    content: string

    @Field({ simple: true, nullable: true })
    user?: User

    static Factory = BlogPostFactory;
}