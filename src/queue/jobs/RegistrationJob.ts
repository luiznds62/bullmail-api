import {BasicJob} from "../../core/BasicJob";
import {JOBS} from "../../common/Constants";
import {Mailer} from "../../common/Mailer";
import {ReflectiveInjector} from "injection-js";
import {UserService} from "../../domain/user/UserService";
import {RegistrationMail} from "../../assets/RegistrationMail";
import "reflect-metadata";

class RegistrationJob extends BasicJob {
    private injector: ReflectiveInjector;
    private mailService: Mailer;
    private userService: UserService;
    private template: RegistrationMail;

    constructor() {
        super();
        this.key = JOBS.REGISTRATION;
        this.options = {};
        this.injector = ReflectiveInjector.resolveAndCreate([Mailer, UserService, RegistrationMail]);
        this.mailService = this.injector.get(Mailer);
        this.userService = this.injector.get(UserService);
        this.template = this.injector.get(RegistrationMail);
    }

    handle = async (job, done) => {
        const {userId} = job.data;

        const user = await this.userService.findById(userId);

        const result = await this.mailService.send({
            from: "mymail@hotmail.com",
            to: user.getEmail(),
            subject: "Account verification",
            text: "test",
            html: await this.template.generate(user)
        });

        done(null, result);
    }
}

export default new RegistrationJob();