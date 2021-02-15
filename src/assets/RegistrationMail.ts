import {BasicEmail} from "./BasicEmail";
import {User} from "../domain/user/User";
import {UserRepository} from "../domain/user/UserRepository";
import {ReflectiveInjector} from "injection-js";
import {UserService} from "../domain/user/UserService";

class RegistrationMail extends BasicEmail {
    private injector;
    private service: UserService;
    private user: User;

    constructor() {
        super();
        this.injector = ReflectiveInjector.resolveAndCreate([UserService]);
        this.service = this.injector.get(UserService);
        this.title = "";
    }

    async generate(userId) {
        this.user = await this.service.findById(userId);


        this.compile();
    }
}