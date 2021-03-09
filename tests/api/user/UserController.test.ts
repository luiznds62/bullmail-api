import { UserController } from '../../../src/api/router';
import { JOBS } from '../../../src/common/Constants';
import { User } from '../../../src/domain/user/User';
import { UserService } from '../../../src/domain/user/UserService';
import { USER_CONSTS } from '../../domain/UserTestUtils';
import QueueManager from '../../../src/queue/QueueManager';

jest.mock('../../../src/domain/user/UserService');
jest.mock('../../../src/queue/QueueManager');

describe('UserController', () => {
  UserService.prototype.findOne = jest.fn().mockReturnValue(new User(USER_CONSTS.userProps));
  const userService = new UserService();
  UserController.service = userService;

  (<any>QueueManager).add.mockImplementation((name, payload) => {
    expect(name).toBe(JOBS.REGISTRATION);
    expect(payload.userId).toBeDefined();
  });

  const req = {
    body: {
      name: 'X'
    }
  };

  const next = jest.fn().mockImplementation((error) => {
    expect(error).not.toBeDefined();
  });

  test('Should send registration mail', async () => {
    await UserController.sendRegistrationMail(<any>req, <any>{}, next);
  });
});
