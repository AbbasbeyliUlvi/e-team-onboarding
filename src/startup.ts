import Container, { Service } from "typedi";
import { Express } from "express";

import { InjectionNames } from "./Infrastructure/Static/InjectionNames";
import { ApolloServerHelper } from "./Infrastructure/Helpers/ApolloServerHelper";
import { IApolloServerHelper } from "./Infrastructure/Helpers/Abstract/IApolloServerHelper";
import { BlogPostService } from "./Services/BlogPostService";
import { BlogPostResolver } from "./Resolvers/BlogPostResolver";
import { ContainerHelper } from "./Infrastructure/Helpers/ContainerHelper";
import { IBlogPostService } from "./Services/Abstract/IBlogPostService";
import { IBlogPostResolver } from "./Resolvers/Abstract/IBlogPostResolver";

@Service()
export class Startup {
    constructor() {
    }

    async configureServices() {
        ContainerHelper
            .set<IApolloServerHelper>(InjectionNames.IApolloServerHelper, ApolloServerHelper)
            .set<IBlogPostService>(InjectionNames.IBlogPostService, BlogPostService)
            .set<IBlogPostResolver>(InjectionNames.IBlogPostResolver, BlogPostResolver)

    }

    async configure(app: Express) {
        const apolloServerHelper = Container.get<IApolloServerHelper>(InjectionNames.IApolloServerHelper)

        const server = await apolloServerHelper.getServer();
        const graphqlPath = process.env.GRAPHQL_PATH;

        await server.start();
        server.applyMiddleware({ app, path: graphqlPath });
    }
}