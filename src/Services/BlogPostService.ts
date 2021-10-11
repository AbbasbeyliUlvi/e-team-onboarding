import { validateOrReject } from "class-validator";
import { ContainerHelper } from "../Infrastructure/Helpers/ContainerHelper";
import { InjectionNames } from "../Infrastructure/Static/InjectionNames";
import { BlogPost } from "../Model/BlogPost";
import { IBlogPostService } from "./Abstract/IBlogPostService";
import { IUserService } from "./Abstract/IUserService";

const data: BlogPost[] = [];

export class BlogPostService implements IBlogPostService {
    private readonly userService: IUserService;

    constructor() {
        this.userService = ContainerHelper.get<IUserService>(InjectionNames.IUserResolver);
    }

    async getAllBlogs() {
        return data
    }

    async addBlogPost(post: BlogPost) {
        const errors = await validateOrReject(post);

        post.id = data.length + 1;

        if (post.author) {
            const author = await this.userService.addUser(post.author)
            await validateOrReject(author);

            post.author = author;
        }

        data.push(post);

        return post;
    }
}