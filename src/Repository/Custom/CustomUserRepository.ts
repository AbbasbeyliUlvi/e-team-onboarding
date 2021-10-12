import { User } from "../../Model/Entity/User";
import { IUserRepository } from "../Abstract/IUserRepository";
import { CustomBaseRepository } from "./Abstract/CustomBaseRepository";

export class CustomUserRepository extends CustomBaseRepository<User, number> implements IUserRepository {
    tableName: string = "USERS";
    primaryColumnName = 'id';

}