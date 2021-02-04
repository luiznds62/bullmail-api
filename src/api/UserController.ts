import BasicController from '../common/BasicController';
import {User} from '../domain/user/User';
import {UserService} from '../domain/user/UserService';

class UserController extends BasicController<User, UserService> {
    constructor() {
        super(User, '/users', UserService);
        this.applyRoutes();
    }

    applyRoutes = () => {
        this.router.get('/', this.findAll);
        this.router.get('/:id', this.findById);
        this.router.post('/', this.create);
        this.router.put('/:id', this.merge);
        this.router.delete('/:id', this.delete);
    };
}

export default new UserController();
