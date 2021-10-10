import { GraphQLResolveInfo } from "graphql";
import { Arg, Info, Mutation, Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";

import { User } from "../Model/User";
import { UserInput } from "../Model/Inputs/UserInput";
import { InjectionNames } from "../Infrastructure/Static/InjectionNames";
import { IUserService } from "../Services/Abstract/IUserService";
import { IUserResolver } from "./Abstract/IUserResolver";

@Service()
@Resolver(_of => User)
export class UserResolver implements IUserResolver {
    private readonly UserService: IUserService;

    constructor() {
        this.UserService = Container.get<IUserService>(InjectionNames.IUserService)
    }

    @Query(_returns => [User])
    getAllUsers(@Info() _info: GraphQLResolveInfo) {
        return this.UserService.getAllUsers();
    }

    @Mutation(_returns => User)
    addUser(@Arg("UserInput") UserInput: UserInput) {
        const reqData = User.Factory.fromInput(UserInput);

        return this.UserService.addUser(reqData)
    }
}