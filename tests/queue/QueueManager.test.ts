import 'dotenv/config';
import QueueManager from '../../src/queue/QueueManager';
import Queue from 'bull';
import { JOBS } from '../../src/common/Constants';
import { USER_CONSTS } from '../domain/UserTestUtils';

jest.mock('bull');

describe('QueueManager', () => {
  Queue.prototype.process.mockImplementation((handle) => {
    expect(handle).toBeDefined();
  });

  Queue.prototype.on.mockImplementation((type, config) => {
    expect(type).toBeDefined();
    expect(config).toBeDefined();
  });

  Queue.prototype.add.mockImplementation((payload, options) => {
    return { payload, options };
  });

  test('Should process Queue', () => {
    QueueManager.process();
  });

  test('Should add to queue', async () => {
    const queue = await QueueManager.add(JOBS.REGISTRATION, { userId: USER_CONSTS.userProps._id });

    expect(queue).toBeDefined();
  });

  test('Should not add without parameters', async () => {
    try {
      await QueueManager.add('', {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('Should not mount queues without jobs', () => {
    try {
      QueueManager.mountQueues([]);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('No jobs was informed');
    }
  });
});
