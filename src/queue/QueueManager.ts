import Queue from "bull";
import * as jobs from "./jobs";
import {logger} from "../common/Logger";
import {BasicJob} from "../core/BasicJob";

let queues;

try {
    queues = Object.values(jobs).map((job: BasicJob) => ({
        bull: new Queue(job.key),
        name: job.key,
        handle: job.handle,
        options: job.options
    }));
} catch (e) {
    logger.error(e);
}

export default {
    queues,
    add(name, payload) {
        const queue = this.queues.find(queue => queue.name === name);

        return queue.bull.add(payload, queue.options);
    },
    process() {
        logger.info("BullMQ started to process queues");

        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on('completed', (job, returnValue) => {
                job.progress(100);
                logger.info(`Job succeeded : ${job.queue.name}`)
            });

            queue.bull.on('waiting', (jobId) => {
                logger.info(`Job awaiting to process: ${jobId}`);
            });

            queue.bull.on('failed', (job, err) => {
                logger.error("Job failed: ", job.queue.name);
                logger.debug(job.data);
                logger.error(err);
            });
        })
    }
}