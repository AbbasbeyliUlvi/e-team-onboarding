import { User } from "../../Model/Entity/User";


export interface IUserService {
    getAllUsers(): Promise<User[]>
    addUser(post: User): Promise<User>
}