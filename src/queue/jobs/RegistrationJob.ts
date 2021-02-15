import {BasicJob} from "../../core/BasicJob";
import {JOBS} from "../../common/Constants";

class RegistrationJob extends BasicJob {
    constructor() {
        super();
        this.key = JOBS.REGISTRATION;
        this.options = {};
    }

    async handle(job, done) {
        done();
    }
}

export default new RegistrationJob();