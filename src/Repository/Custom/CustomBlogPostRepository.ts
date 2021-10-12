import { BlogPost } from "../../Model/BlogPost";
import { IBlogPostRepository } from "../Abstract/IBlogPostRepository";
import { CustomBaseRepository } from "./Abstract/CustomBaseRepository";

export class CustomBlogPostRepository extends CustomBaseRepository<BlogPost, number> implements IBlogPostRepository {
    tableName = "BLOG_POSTS";
    primaryColumnName: any = '"id"';




}