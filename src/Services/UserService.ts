import { User } from "../Model/User";
import { IUserService } from "./Abstract/IUserService";

const data: User[] = [];

export class UserService implements IUserService {

    async getAllUsers() {
        return data
    }

    async addUser(item: User) {
        item.id = data.length + 1;
        data.push(item);

        return item;
    }
}