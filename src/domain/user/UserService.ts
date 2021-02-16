import {UserRepository} from '../user/UserRepository';
import {BasicService} from "../../core/BasicService";
import {User} from "./User";

export class UserService extends BasicService<UserRepository, User> {

    constructor() {
        super(UserRepository);
    }

}
