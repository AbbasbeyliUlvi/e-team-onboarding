import Container from "typedi";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BaseContext } from "apollo-server-types";
import { GraphQLRequestContext } from "apollo-server-core";

import { InjectionNames } from "../Static/InjectionNames";
import { IApolloServerHelper } from "./Abstract/IApolloServerHelper";
import { IBlogPostResolver } from "../../Resolvers/Abstract/IBlogPostResolver";
import { ContainerHelper } from "./ContainerHelper";

export class ApolloServerHelper implements IApolloServerHelper {

    constructor() {
    }

    private server: ApolloServer<{}>;
    private readonly destroyContextOnRequestFinishPlugin = {
        requestDidStart: async () => ({
            async willSendResponse(requestContext: GraphQLRequestContext<BaseContext>) {
                Container.reset(requestContext.context.requestId);
            },
        }),
    };

    async getServer() {
        if (!this.server) {
            this.server = await this.buildServer();
        }

        return this.server;
    }

    private async buildServer() {
        const schema = await this.buildSchema();
        const context = this.prepareContext();

        const server = new ApolloServer({
            schema,
            context: context,
            plugins: [
                this.destroyContextOnRequestFinishPlugin
            ],
        });
        return server;
    }

    private prepareContext() {
        return ({ }) => {
            const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
            const container = Container.of(requestId);
            const context = { requestId, container };

            container.set("context", context);

            return context;
        };
    }

    private async buildSchema() {
        const blogPostResolverConstructor = ContainerHelper.getConstructor<IBlogPostResolver>(InjectionNames.IBlogPostResolver);

        return await buildSchema({
            resolvers: [
                blogPostResolverConstructor
            ],
            container: Container,
            authMode: "null",
        });
    }
}