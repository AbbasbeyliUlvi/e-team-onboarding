import { GraphQLResolveInfo } from "graphql";
import { Arg, Info, Mutation, Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";

import { BlogPost } from "../Model/Entity/BlogPost";
import { BlogPostInput } from "../Model/Inputs/BlogPostInput";
import { IBlogPostResolver } from "./Abstract/IBlogPostResolver";
import { InjectionNames } from "../Infrastructure/Static/InjectionNames";
import { IBlogPostService } from "../Services/Abstract/IBlogPostService";

@Service()
@Resolver(_of => BlogPost)
export class BlogPostResolver implements IBlogPostResolver {
    private readonly blogPostService: IBlogPostService;

    constructor() {
        this.blogPostService = Container.get<IBlogPostService>(InjectionNames.IBlogPostService)
    }

    @Query(_returns => [BlogPost])
    async getAllBlogs(@Info() _info: GraphQLResolveInfo) {
        return this.blogPostService.getAllBlogs();
    }

    @Mutation(_returns => BlogPost)
    async addBlogPost(@Arg("blogPostInput") blogPostInput: BlogPostInput) {
        const reqData = BlogPost.Factory.fromInput(blogPostInput);

        return this.blogPostService.addBlogPost(reqData)
    }
}