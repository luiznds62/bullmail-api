import { User } from '../../src/domain/user/User';
import { UserService } from '../../src/domain/user/UserService';
import { AuthHandler } from '../../src/security/AuthHandler';
import { USER_CONSTS } from '../domain/UserTestUtils';

jest.mock('../../src/domain/user/UserService');

describe('AuthHandler', () => {
  UserService.prototype.findByEmail = jest.fn().mockImplementation(() => {
    return new User({
      _id: '1234',
      name: USER_CONSTS.userProps.name,
      email: USER_CONSTS.userProps.email,
      password: '$2a$10$pyqZFQuwboxvKqjuN0bP5.qs4VzgclygmPaKvY0x8RuD.UXt.YR6a'
    });
  });
  const authHandler: AuthHandler = new AuthHandler();

  const req = {
    body: {
      email: USER_CONSTS.userProps.email,
      password: USER_CONSTS.userProps.password
    }
  };

  const next = jest.fn().mockImplementation((ret) => {
    return ret;
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test.only('Should authenticate', async () => {
    const response = await authHandler.authenticate(req, {}, next);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });
});
