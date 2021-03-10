import { RegistrationMail } from '../../../src/assets/RegistrationMail';
import { Mailer } from '../../../src/common/Mailer';
import { User } from '../../../src/domain/user/User';
import { UserService } from '../../../src/domain/user/UserService';
import { RegistrationJob } from '../../../src/queue/jobs';
import { USER_CONSTS } from '../../domain/UserTestUtils';

jest.mock('../../../src/domain/user/UserService');
jest.mock('../../../src/common/Mailer');
jest.mock('../../../src/assets/RegistrationMail');

describe('RegistrationJob', () => {
  test('Should RegistrationJob have correct properties', () => {
    expect(RegistrationJob).toBeDefined();
    expect(RegistrationJob.key).toBe('RegistrationJob');
    expect(RegistrationJob.handle).toBeDefined();
    expect(RegistrationJob.handle).toBeInstanceOf(Function);
  });

  test('Should handle RegistrationJob', async () => {
    const jobOptions = { data: { userId: USER_CONSTS.userProps._id } };
    UserService.prototype.findById = jest.fn().mockReturnValue(new User(USER_CONSTS.userProps));
    Mailer.prototype.send = jest.fn().mockReturnValue(true);
    RegistrationJob.userService = new UserService();
    RegistrationJob.mailService = new Mailer();

    const done = jest.fn().mockImplementation((error, result) => {
      expect(result).toBeDefined();
    });

    await RegistrationJob.handle(jobOptions, done);
  });
});
