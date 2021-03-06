import nedb from 'nedb';
import { User } from '../../src/domain/user/User';
import { UserRepository } from '../../src/domain/user/UserRepository';

describe('UserRepository', () => {
  test('Should create instance', async () => {
    const repository: UserRepository = new UserRepository();

    expect(repository).toBeDefined();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
