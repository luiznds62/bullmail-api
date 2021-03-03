import { User } from '../../src/domain/user/User';
import { UserRepository } from '../../src/domain/user/UserRepository';
import { UserService } from '../../src/domain/user/UserService';

jest.mock('../../src/domain/user/UserRepository', () => {
  return jest.fn().mockImplementation(() => {
    return {
      findByEMail: jest.fn().mockReturnValue(1)
    };
  });
});

const CONSTS = {
  email: 'test@hotmail.com'
};
const userService: UserService = new UserService();

test('Should find by email', async () => {
  const user: User = await userService.findByEmail(CONSTS.email);

  expect(user).toBeDefined();
});
