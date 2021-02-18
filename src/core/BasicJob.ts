interface IBasicJob {
    key: string;
    options: Object;

    handle(job, done);
}

export abstract class BasicJob implements IBasicJob {
    key: string;
    options: Object;

    handle(job, done) {

    }
}