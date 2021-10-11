import { BlogPost } from "../../Model/BlogPost";


export interface IBlogPostService {
    getAllBlogs(): Promise<BlogPost[]>
    addBlogPost(post: BlogPost): Promise<BlogPost>
}