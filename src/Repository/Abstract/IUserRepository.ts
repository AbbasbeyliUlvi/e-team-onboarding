import { User } from "../../Model/User";
import { IBaseRepository } from "./IBaseRepository";


export interface IUserRepository extends IBaseRepository<User, number> {
    
}