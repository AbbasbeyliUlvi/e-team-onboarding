import { validateOrReject } from "class-validator";
import { ContainerHelper } from "../Infrastructure/Helpers/ContainerHelper";
import { InjectionNames } from "../Infrastructure/Static/InjectionNames";

import { User } from "../Model/User";
import { IUserRepository } from "../Repository/Abstract/IUserRepository";
import { IUserService } from "./Abstract/IUserService";

const data: User[] = [];

export class UserService implements IUserService {
    userRepository: IUserRepository;

    constructor() {
        this.userRepository = ContainerHelper.get<IUserRepository>(InjectionNames.IUserRepository);
    }
    async getAllUsers() {
        return data
    }

    async addUser(item: User) {
        await validateOrReject(item);
        const result = await this.userRepository.save(item);

        return result;
    }
}