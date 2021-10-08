import { BlogPost } from "../../Model/BlogPost";


export interface IBlogPostService {
    getAllBlogs(): BlogPost[]
    addBlogPost(post:BlogPost): BlogPost
}