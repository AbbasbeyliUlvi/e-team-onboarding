import { BlogPost } from "../../Model/BlogPost";
import { IBaseRepository } from "./IBaseRepository";


export interface IBlogPostRepository extends IBaseRepository<BlogPost,number>{

}