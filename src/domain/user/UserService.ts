import { UserRepository } from '../user/UserRepository';
import { BasicService} from "../../core/BasicService";

export class UserService extends BasicService<UserRepository>{
  injector;

  constructor() {
    super(UserRepository);
  }

}
