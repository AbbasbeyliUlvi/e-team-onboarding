import { QueryResult } from "pg";
import { BlogPost } from "../../Model/BlogPost";
import { IBlogPostRepository } from "../Abstract/IBlogPostRepository";
import { CustomBaseRepository } from "./Abstract/CustomBaseRepository";
import { PgClient } from "./Client";
import { FindOptions } from "./CustomRepositoryTypes";

export class CustomBlogPostRepository extends CustomBaseRepository<BlogPost, number> implements IBlogPostRepository {
    tableName = "BLOG_POSTS";
    primaryColumnName: any = 'id';

    override async find(options?: FindOptions<BlogPost>): Promise<BlogPost[]> {
        const query = `
        select 
            p."id" "post_id",
            p."title" "post_title",
            p."content" "post_content",
            u."id" "user_id",
            u."email" "user_email",
            u."firstName" "user_firstName",
            u."lastName" "user_lastName"
        from 
            ${this.tableName} as p 
        left join 
            USERS as u 
        on 
            p.user_id = u.id
 `;
        console.log(query);
        const result = await PgClient.executeQuery<BlogPost[]>(query, [], this.parseFindAllResult);
        return result;
    }

    private async parseFindAllResult(res: QueryResult<any>) {
        return res
            .rows
            .map<BlogPost>(data => ({
                id: data.post_id,
                title: data.post_title,
                content: data.post_content,
                user_id: data.user_id,
                user: {
                    id: data.user_id,
                    email: data.user_email,
                    firstName: data.user_firstName,
                    lastName: data.user_lastName,
                }
            }));
    }


}