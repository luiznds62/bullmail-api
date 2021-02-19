import { User } from "./User";
import {BasicRepository} from "../../core/BasicRepository";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository extends BasicRepository<User> {

    constructor(){
        super(User);
    }

}
