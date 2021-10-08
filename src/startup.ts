import Container, { Service } from "typedi";
import { Express } from "express";

import { InjectionNames } from "./Infrastructure/Static/InjectionNames";
import { ApolloServerHelper } from "./Infrastructure/Helpers/ApolloServerHelper";
import { IApolloServerHelper } from "./Infrastructure/Helpers/Abstract/IApolloServerHelper";
import { BlogPostService } from "./Services/BlogPostService";

@Service()
export class Startup {
    constructor() {
    }

    async configureServices() {
        Container.set({ id: InjectionNames.IApolloServerHelper, type: ApolloServerHelper });
        Container.set({ id: InjectionNames.IBlogPostService, type: BlogPostService });
    }

    async configure(app: Express) {
        const apolloServerHelper = Container.get<IApolloServerHelper>(InjectionNames.IApolloServerHelper)

        const server = await apolloServerHelper.getServer();
        const graphqlPath = process.env.GRAPHQL_PATH;

        await server.start();
        server.applyMiddleware({ app, path: graphqlPath });

    }
}