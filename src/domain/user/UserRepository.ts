import { User } from "./User";
import {Repository} from "../../common/Repository";

export class UserRepository extends Repository<User> {

    constructor(){
        super(User);
    }

}
