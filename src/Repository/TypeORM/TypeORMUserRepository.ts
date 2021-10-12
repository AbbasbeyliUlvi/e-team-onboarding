import { EntityTarget } from "typeorm";
import { User } from "../../Model/Entity/User";
import { IUserRepository } from "../Abstract/IUserRepository";
import { TypeORMBaseRepository } from "./Abstract/TypeORMBaseRepository";


export class TypeORMUserRepository extends TypeORMBaseRepository<User, number> implements IUserRepository {
    protected entityTarget: EntityTarget<User> = User;
    protected primaryField: keyof User = "id";

}