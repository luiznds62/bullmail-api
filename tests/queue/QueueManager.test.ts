import 'dotenv/config';
import QueueManager from '../../src/queue/QueueManager';
import Queue from 'bull';

jest.mock('bull');

describe('QueueManager', () => {
  Queue.prototype.process = jest.fn().mockImplementation(() => {
    console.log('teste');
  });

  test('Should process Queue', () => {
    const queues = QueueManager.process();

    //expect(queues).toBeDefined();
  });
});
