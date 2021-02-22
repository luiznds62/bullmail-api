import { User } from "./User";
import { BasicRepository } from "../../core/BasicRepository";

export class UserRepository extends BasicRepository<User> {

    constructor() {
        super(User);
    }

}
