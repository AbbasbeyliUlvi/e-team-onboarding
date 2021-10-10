import { ContainerHelper } from "../Infrastructure/Helpers/ContainerHelper";
import { InjectionNames } from "../Infrastructure/Static/InjectionNames";
import { BlogPost } from "../Model/BlogPost";
import { User } from "../Model/User";
import { IBlogPostService } from "./Abstract/IBlogPostService";
import { ICommonSearchService } from "./Abstract/ICommonSearchService";
import { IUserService } from "./Abstract/IUserService";


export class CommonSearchService implements ICommonSearchService {
    private readonly userService: IUserService;
    private readonly blogPostService: IBlogPostService;

    constructor() {
        this.userService = ContainerHelper.get<IUserService>(InjectionNames.IUserService);
        this.blogPostService = ContainerHelper.get<IBlogPostService>(InjectionNames.IBlogPostService);
    }

    search(searchText: string): (BlogPost | User)[] {

        const users = this.userService.getAllUsers().filter(u =>
            u.email?.includes(searchText)
            || u.firstName?.includes(searchText)
            || u.lastName?.includes(searchText)
        );

        const posts = this.blogPostService.getAllBlogs().filter(p =>
            p.title?.includes(searchText)
            || p.content?.includes(searchText)
        )

        return [...users, ...posts];
    }

}