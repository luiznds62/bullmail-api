import BasicController from '../../core/BasicController';
import {User} from '../../domain/user/User';
import {UserService} from '../../domain/user/UserService';
import {UserMap} from "./UserDto";

class UserController extends BasicController<User, UserService, UserMap> {
    constructor() {
        super(User, '/users', UserService, UserMap);
        this.applyRoutes();
    }

    applyRoutes = () => {
        this.router.get('/', ...this.findAll);
        this.router.get('/:id', this.findById);
        this.router.post('/', this.create);
        this.router.put('/:id', this.merge);
        this.router.delete('/:id', this.delete);
    };
}

export default new UserController();