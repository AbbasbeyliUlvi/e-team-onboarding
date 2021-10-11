import { GraphQLResolveInfo } from "graphql";
import { User } from "../../Model/User";
import { UserInput } from "../../Model/Inputs/UserInput";

export interface IUserResolver {
    getAllUsers(_info: GraphQLResolveInfo): Promise<User[]>
    addUser(UserInput: UserInput): Promise<User>
}