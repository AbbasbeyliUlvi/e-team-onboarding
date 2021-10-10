import { UserInputError } from "apollo-server-errors";
import { UserInput } from "../Inputs/UserInput";
import { User } from "../User";

export class UserFactory {

    public static fromInput(input: UserInput): User {
        if (!input) {
            throw new UserInputError("input must be set");
        }

        const result: User = {
            id: input.id,
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
        };
        return result;
    }
}
