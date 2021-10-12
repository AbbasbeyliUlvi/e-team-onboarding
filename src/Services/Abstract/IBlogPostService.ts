import { BlogPost } from "../../Model/Entity/BlogPost";


export interface IBlogPostService {
    getAllBlogs(): Promise<BlogPost[]>
    addBlogPost(post: BlogPost): Promise<BlogPost>
}