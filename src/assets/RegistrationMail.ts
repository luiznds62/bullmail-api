import {BasicEmail} from "./BasicEmail";
import {User} from "../domain/user/User";
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
    }

    async generate(userId) {
        this.user = await this.service.findById(userId);

        this.setTitle(`<strong>${this.user.getName()}</strong>, Welcome :) <br/>`);
        this.setPreheader(`<small>This e-mail is for the activation of your account</small><br/>`);
        this.setGreeting(`<strong>We're so proud to have you as our new User!</strong><br/>`);
        this.setContent(`<a href="" target="_blank">Click in this link to have full access to your account features</a>`);
        this.setEnding(`<p>If you have any doubts just reply this</p>`);
        this.setMeta(`<small>Best regards :D</small>`);

        return this.compile();
    }
}