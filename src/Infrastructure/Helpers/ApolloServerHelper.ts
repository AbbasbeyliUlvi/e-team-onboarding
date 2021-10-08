import Container from "typedi";
import { ApolloServer, gql } from "apollo-server-express";

import { InjectionNames } from "../Static/InjectionNames";
import { IBlogPostService } from "../../Services/Abstract/IBlogPostService";
import { IApolloServerHelper } from "./Abstract/IApolloServerHelper";
import { BlogPost } from "../../Model/BlogPost";

const typeDefs = gql`  
    type BlogPost {
        title: String
        content: String
    }

    type Query {
        getAllBlogs: [BlogPost]
    }

    type Mutation {
        addBlogPost(title: String!, content: String!): BlogPost
    }
`;

export class ApolloServerHelper implements IApolloServerHelper {
    private readonly simpleService: IBlogPostService;

    constructor() {
        this.simpleService = Container.get<IBlogPostService>(InjectionNames.IBlogPostService)
    }

    async getServer() {
        const server = new ApolloServer({
            typeDefs,

            resolvers: {
                Query: {
                    getAllBlogs: this.simpleService.getAllBlogs,
                },
                Mutation: {
                    addBlogPost: (_, post: BlogPost) => this.simpleService.addBlogPost(post)
                }
            }

        });
        return server;
    }


}