import { User } from "../../Model/User";


export interface IUserService {
    getAllUsers(): Promise<User[]>
    addUser(post: User): Promise<User>
}