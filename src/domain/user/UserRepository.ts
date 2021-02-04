import { User } from "./User";
import {BasicRepository} from "../../common/BasicRepository";

export class UserRepository extends BasicRepository<User> {

    constructor(){
        super(User);
    }

}
