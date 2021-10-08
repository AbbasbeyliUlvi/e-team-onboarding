import { BlogPost } from "../Model/BlogPost";
import { IBlogPostService } from "./Abstract/IBlogPostService";

const data: BlogPost[] = [];

export class BlogPostService implements IBlogPostService {

    getAllBlogs() {
        return data
    }

    addBlogPost( post:BlogPost) { 
        data.push(post);

        return post;
    }
}