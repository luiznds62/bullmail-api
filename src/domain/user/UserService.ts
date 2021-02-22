import {User} from "./User";
import {UserRepository} from '../user/UserRepository';
import {BasicService} from "../../core/BasicService";

export class UserService extends BasicService<UserRepository, User> {

    constructor() {
        super(UserRepository);
    }

    findByEmail(email: string): Promise<User> {
        return this.findOne({email: email});
    }
}
