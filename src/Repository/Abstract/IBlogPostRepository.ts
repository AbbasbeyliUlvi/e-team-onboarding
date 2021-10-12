import { BlogPost } from "../../Model/Entity/BlogPost";
import { IBaseRepository } from "./IBaseRepository";


export interface IBlogPostRepository extends IBaseRepository<BlogPost,number>{

}