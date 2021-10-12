import { EntityTarget } from "typeorm";
import { BlogPost } from "../../Model/Entity/BlogPost";
import { IBlogPostRepository } from "../Abstract/IBlogPostRepository";
import { TypeORMBaseRepository } from "./Abstract/TypeORMBaseRepository";


export class TypeORMBlogPostRepository extends TypeORMBaseRepository<BlogPost, number> implements IBlogPostRepository {
    protected entityTarget: EntityTarget<BlogPost> = BlogPost;
    protected primaryField: keyof BlogPost = "id";

}