import { GraphQLResolveInfo } from "graphql";
import { BlogPost } from "../../Model/BlogPost";
import { BlogPostInput } from "../../Model/Inputs/BlogPostInput";

export interface IBlogPostResolver {
    getAllBlogs(_info: GraphQLResolveInfo): Promise<BlogPost[]>

    addBlogPost(blogPostInput: BlogPostInput): Promise<BlogPost>
}