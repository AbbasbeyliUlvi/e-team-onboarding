import { validateOrReject } from "class-validator";

import { User } from "../Model/User";
import { IUserService } from "./Abstract/IUserService";

const data: User[] = [];

export class UserService implements IUserService {

    async getAllUsers() {
        return data
    }

    async addUser(item: User) {
        await validateOrReject(item);

        item.id = data.length + 1;
        data.push(item);

        return item;
    }
}