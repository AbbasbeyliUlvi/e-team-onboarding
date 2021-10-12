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
import { UserService } from "./Services/UserService";
import { IUserService } from "./Services/Abstract/IUserService";
import { IUserResolver } from "./Resolvers/Abstract/IUserResolver";
import { UserResolver } from "./Resolvers/UserResolver";
import { ICommonSearchResolver } from "./Resolvers/Abstract/ICommonSearchResolver";
import { CommonSearchResolver } from "./Resolvers/CommonSearchResolver";
import { CommonSearchService } from "./Services/CommonSearchService";
import { ICommonSearchService } from "./Services/Abstract/ICommonSearchService";
import { IUserRepository } from "./Repository/Abstract/IUserRepository";
import { CustomUserRepository } from "./Repository/Custom/CustomUserRepository";
import { CustomBlogPostRepository } from "./Repository/Custom/CustomBlogPostRepository";
import { IBlogPostRepository } from "./Repository/Abstract/IBlogPostRepository";
import { CreateBlogPostsTable } from "./Repository/Custom/mirgations/CreateBlogPostsTable";
import { CreateUsersTable } from "./Repository/Custom/mirgations/CreateUsersTable";
import { TypeORMBlogPostRepository } from "./Repository/TypeORM/TypeORMBlogPostRepository";
import { TypeORMUserRepository } from "./Repository/TypeORM/TypeORMUserRepository";

@Service()
export class Startup {
    constructor() {
    }

    async configureServices() {
        ContainerHelper
            .set<IApolloServerHelper>(InjectionNames.IApolloServerHelper, ApolloServerHelper)
            .set<IBlogPostService>(InjectionNames.IBlogPostService, BlogPostService)
            .set<IBlogPostResolver>(InjectionNames.IBlogPostResolver, BlogPostResolver)
            .set<IUserService>(InjectionNames.IUserService, UserService)
            .set<IUserResolver>(InjectionNames.IUserResolver, UserResolver)
            .set<ICommonSearchService>(InjectionNames.ICommonSearchService, CommonSearchService)
            .set<ICommonSearchResolver>(InjectionNames.ICommonSearchResolver, CommonSearchResolver)
            .set<IUserRepository>(InjectionNames.IUserRepository, TypeORMUserRepository)
            .set<IBlogPostRepository>(InjectionNames.IBlogPostRepository, TypeORMBlogPostRepository)

    }

    async configure(app: Express) {
        // await new CreateBlogPostsTable().down()
        // await new CreateUsersTable().down()
        // setTimeout(async () => {
        //     await new CreateBlogPostsTable().up()
        //     await new CreateUsersTable().up()
        // }, 1000);
        const apolloServerHelper = Container.get<IApolloServerHelper>(InjectionNames.IApolloServerHelper)

        const server = await apolloServerHelper.getServer();
        const graphqlPath = process.env.GRAPHQL_PATH;

        await server.start();
        server.applyMiddleware({ app, path: graphqlPath });
    }
}