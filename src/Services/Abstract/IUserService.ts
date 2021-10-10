import { User } from "../../Model/User";


export interface IUserService {
    getAllUsers(): User[]
    addUser(post:User): User
}