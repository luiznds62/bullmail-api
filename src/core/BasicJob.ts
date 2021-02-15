interface IBasicJob {
    key: string;
    options: Object;

    handle(job, done);
}

export class BasicJob implements IBasicJob {
    key: string;
    options: Object;

    handle(job, done) {

    }
}