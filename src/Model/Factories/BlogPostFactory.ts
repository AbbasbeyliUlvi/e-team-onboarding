import { BlogPostInput } from "../Inputs/BlogPostInput";
import { User } from "../User";
import { BlogPost } from "../BlogPost";
import { UserInputError } from "apollo-server-errors";

export class BlogPostFactory {

    public static fromInput(input: BlogPostInput): BlogPost {
        if (!input) {
            throw new UserInputError("input must be set");
        }
        
        const result: BlogPost = {
            title: input.title,
            content: input.content,
            id: input.id,
            author: input.user && User.Factory.fromInput(input.user)
        };
        return result;
    }
}
