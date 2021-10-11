import { ContainerHelper } from "../Infrastructure/Helpers/ContainerHelper";
import { InjectionNames } from "../Infrastructure/Static/InjectionNames";
import { CommonSearchResult } from "../Model/Inputs/CommonSearchResult";
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

    async search(searchText: string): Promise<(typeof CommonSearchResult)[]> {

        const users = (await this.userService.getAllUsers())
            .filter(u =>
                u.email?.includes(searchText)
                || u.firstName?.includes(searchText)
                || u.lastName?.includes(searchText)
            );

        const posts = (await this.blogPostService.getAllBlogs())
            .filter(p =>
                p.title?.includes(searchText)
                || p.content?.includes(searchText)
            )

        return [...users, ...posts];
    }

}