import BasicController from '../../core/BasicController';
import {User} from '../../domain/user/User';
import {UserService} from '../../domain/user/UserService';
import {UserMap} from "./UserDto";
import {JOBS} from "../../common/Constants";
import {ReflectiveInjector} from "injection-js";
import QueueManager from "../../queue/QueueManager";
import express from "express";

class UserController extends BasicController<User, UserService, UserMap> {
    injector: ReflectiveInjector;
    service: UserService;

    constructor() {
        super(User, '/users', UserService, UserMap);
        this.applyRoutes();
        this.injector = ReflectiveInjector.resolveAndCreate([UserService]);
        this.service = this.injector.get(UserService);
    }

    applyRoutes = () => {
        this.router.get('/', ...this.findAll);
        this.router.get('/:id', this.findById);
        this.router.post('/', this.create, this.sendRegistrationMail);
        this.router.put('/:id', this.merge);
        this.router.delete('/:id', this.delete);
    };

    sendRegistrationMail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const user = await this.service.findOne({name: req.body.name});
            await QueueManager.add(JOBS.REGISTRATION, {userId: user.getId()});
        } catch (e) {
            throw new Error(`Erro ao adicionar na fila: ${e.message}`);
        } finally {
            next();
        }
    }
}

export default new UserController();