import { BlogPostInput } from "../Inputs/BlogPostInput";
import { User } from "../Entity/User";
import { BlogPost } from "../Entity/BlogPost";
import { UserInputError } from "apollo-server-errors";

export class BlogPostFactory {

    public static fromInput(input: BlogPostInput): BlogPost {
        if (!input) {
            throw new UserInputError("input must be set");
        }

        const result: BlogPost = new BlogPost();
        result.id = input.id;
        result.title = input.title;
        result.content = input.content;
        result.user = input.user && User.Factory.fromInput(input.user);

        return result;
    } 

    public static getSelectQuery(...columns: ('id' | 'title' | 'content')[]) {
        return `select ${columns.join(', ')} from BlogPost;`
    }
}
