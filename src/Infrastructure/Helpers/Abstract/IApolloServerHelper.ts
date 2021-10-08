import { ApolloServer, ExpressContext } from "apollo-server-express";

export interface IApolloServerHelper {
    getServer(): Promise<ApolloServer<ExpressContext>>;
}