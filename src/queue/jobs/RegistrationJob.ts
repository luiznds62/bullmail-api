import {BasicJob} from "../../core/BasicJob";
import {JOBS} from "../../common/Constants";
import {Mailer} from "../../common/Mailer";
import {ReflectiveInjector} from "injection-js";

class RegistrationJob extends BasicJob {
    private injector;
    private mailService: Mailer;

    constructor() {
        super();
        this.key = JOBS.REGISTRATION;
        this.options = {};
        this.injector = ReflectiveInjector.resolveAndCreate([Mailer]);
        this.mailService = this.injector.get(Mailer);
    }

    async handle(job, done) {
        const {userId} = job.data;

        const user =

        this.mailService.send({
            from: "bullmail@abc.com",
            to:
        })

        done();
    }
}

export default new RegistrationJob();