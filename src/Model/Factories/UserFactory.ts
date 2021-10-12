import { UserInputError } from "apollo-server-errors";
import { validate } from "class-validator";
import { UserInput } from "../Inputs/UserInput";
import { User } from "../Entity/User";

export class UserFactory {

    public static fromInput(input: UserInput): User {
        if (!input) {
            throw new UserInputError("input must be set");
        }
        validate(input);
        const result: User = new User();
        result.id = input.id;
        result.email = input.email;
        result.firstName = input.firstName;
        result.lastName = input.lastName;

        return result;
    } 
}
