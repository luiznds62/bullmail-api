import { ReflectiveInjector } from "injection-js";
import {UserRepository} from "../user/UserRepository";

export class UserService {
    injector;
    repository: UserRepository;
    
    constructor() {
        this.injector = ReflectiveInjector.resolveAndCreate([UserRepository]);
        this.repository = this.injector.get(UserRepository);
    }

    findAll() {
        return this.repository.findAll();
    }

    create(user) {
        return this.repository.create(user);
    }
}