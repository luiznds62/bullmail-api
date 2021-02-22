import "reflect-metadata";
import express from "express";
import BasicController from '../../core/BasicController';
import QueueManager from "../../queue/QueueManager";
import {User} from '../../domain/user/User';
import {UserService} from '../../domain/user/UserService';
import {UserMap} from "./UserDto";
import {JOBS} from "../../common/Constants";
import { Inject } from "typescript-ioc";

class UserController extends BasicController<User, UserService, UserMap> {
    @Inject
    service: UserService;

    constructor() {
        super(User, '/users', UserService, UserMap);
        this.applyRoutes();
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
            throw new Error(`Error while trying to send registration mail: ${e.message}`);
        } finally {
            next();
        }
    }
}

export default new UserController();