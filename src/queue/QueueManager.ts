import Queue from 'bull';
import * as jobs from './jobs';
import { logger } from '../common/Logger';
import { BasicJob } from '../core/BasicJob';
import environment from '../common/Environments';

let queues;

const redisConfig = {
  redis: {
    port: environment.REDIS.PORT,
    host: environment.REDIS.HOST,
    password: environment.REDIS.PASSWORD
  }
};

function mountQueues(jobs) {
  try {
    if (jobs.length === 0) {
      throw new Error('No jobs was informed');
    }

    queues = jobs.map((job: BasicJob) => ({
      bull: new Queue(job.key, redisConfig),
      name: job.key,
      handle: job.handle,
      options: job.options
    }));
  } catch (e) {
    logger.error(e);
  }
}

mountQueues(Object.values(jobs));

export default {
  queues,
  mountQueues,
  add(name, payload) {
    const queue = queues.find((queue) => queue.name === name);

    try {
      return queue.bull.add(payload, queue.options);
    } catch (e) {
      logger.error(`Error while try to add new Queue (${queue.name}): ${e.message}`);
    }
  },
  process() {
    logger.info('BullMQ started to process queues');

    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('completed', (job, returnValue) => {
        job.progress(100);
        logger.info(`Job succeeded : ${job.queue.name}`);
      });

      queue.bull.on('waiting', (jobId) => {
        logger.info(`Job awaiting to process: ${jobId}`);
      });

      queue.bull.on('failed', (job, err) => {
        logger.error('Job failed: ', job.queue.name);
        logger.debug(job.data);
        logger.error(err);
      });
    });
  }
};
