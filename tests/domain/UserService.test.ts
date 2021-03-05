import { User } from '../../src/domain/user/User';
import { UserRepository } from '../../src/domain/user/UserRepository';
import { UserService } from '../../src/domain/user/UserService';

jest.mock('../../src/domain/user/UserRepository');

const CONSTS = {
  email: 'test@hotmail.com',
  userProps: {
    _id: '123456',
    name: 'testes',
    email: 'test@hotmail.com',
    password: '12345678'
  }
};

let userService: UserService;

beforeAll(() => {
  userService = new UserService();
});

beforeEach(() => {
  UserRepository.findOne.mockImplementation(() => {
    return 'teste';
  });
});

test('Should find by email', async () => {
  const user: User = await userService.findByEmail(CONSTS.email);

  expect(user).toBeDefined();
});
