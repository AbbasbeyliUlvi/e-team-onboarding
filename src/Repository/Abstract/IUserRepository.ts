import { User } from "../../Model/Entity/User";
import { IBaseRepository } from "./IBaseRepository";


export interface IUserRepository extends IBaseRepository<User, number> {
    
}