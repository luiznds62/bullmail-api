import "reflect-metadata";
import {BasicJob} from "../../core/BasicJob";
import {JOBS} from "../../common/Constants";
import {Mailer} from "../../common/Mailer";
import {UserService} from "../../domain/user/UserService";
import {RegistrationMail} from "../../assets/RegistrationMail";
import { container } from 'tsyringe';
import { Inject } from "typescript-ioc";

class RegistrationJob extends BasicJob {
    
    @Inject
    private mailService: Mailer;

    @Inject
    private userService: UserService;

    @Inject
    private template: RegistrationMail;

    constructor() {
        super();
        this.key = JOBS.REGISTRATION;
        this.options = {};
        this.mailService = container.resolve(Mailer);
        this.userService = container.resolve(UserService);
        this.template = container.resolve(RegistrationMail);
    }

    handle = async (job, done) => {
        const {userId} = job.data;

        const user = await this.userService.findById(userId);

        const result = await this.mailService.send({
            from: "BullMail <no-reply@bullmailteam.com>",
            to: `${user.getName()} ${user.getEmail()}`,
            subject: "Account verification",
            text: "Please confirm your account with the instructions",
            html: await this.template.generate(user)
        });

        done(null, result);
    }
}

export default new RegistrationJob();