import { validateOrReject } from "class-validator";
import { ContainerHelper } from "../Infrastructure/Helpers/ContainerHelper";
import { InjectionNames } from "../Infrastructure/Static/InjectionNames";
import { BlogPost } from "../Model/BlogPost";
import { IBlogPostRepository } from "../Repository/Abstract/IBlogPostRepository";
import { IUserRepository } from "../Repository/Abstract/IUserRepository";
import { IBlogPostService } from "./Abstract/IBlogPostService";
import { IUserService } from "./Abstract/IUserService";

const data: BlogPost[] = [];

export class BlogPostService implements IBlogPostService {
    private readonly userService: IUserService;
    private readonly blogPostRepository: IBlogPostRepository;

    constructor() {
        this.userService = ContainerHelper.get<IUserService>(InjectionNames.IUserResolver);
        this.blogPostRepository = ContainerHelper.get<IBlogPostRepository>(InjectionNames.IBlogPostRepository);
    }

    async getAllBlogs() {
        const result = await this.blogPostRepository.find();

        return result;
    }

    async addBlogPost(post: BlogPost) {
        await validateOrReject(post);

        if (post.user) {
            post.user = await this.userService.addUser(post.user);
        }

        const result = await this.blogPostRepository.save(post);

        return result;
    }
}