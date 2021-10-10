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

    getAllBlogs() {
        return data
    }

    addBlogPost(post: BlogPost) {
        const author = post.author && this.userService.addUser(post.author)

        post.id = data.length + 1;
        post.author = author;

        data.push(post);

        return post;
    }
}