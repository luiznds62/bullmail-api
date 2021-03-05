import { Result } from '../../src/common/Result';
import { User } from '../../src/domain/user/User';

const CONSTS = {
  _id: 1,
  name: 'tester',
  email: 'test@test.com',
  password: '123456'
};

describe('User', () => {
  test('Should create User', async () => {
    const result: Result<User> = await User.create({
      _id: CONSTS._id,
      name: CONSTS.name,
      email: CONSTS.email,
      password: CONSTS.password
    });

    expect(result.getValue()).toBeDefined();
    expect(result.getValue().getId()).toBe(CONSTS._id);
    expect(result.getValue().getEmail()).toBe(CONSTS.email);
    expect(result.getValue().getPassword()).toBe(CONSTS.password);
  });

  test('Should not create User without name', async () => {
    try {
      await User.create({
        _id: CONSTS._id,
        name: undefined,
        email: CONSTS.email,
        password: CONSTS.password
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('name should not be null or undefined');
    }
  });

  test('Should not create User without email', async () => {
    try {
      await User.create({
        _id: CONSTS._id,
        name: CONSTS.name,
        email: undefined,
        password: CONSTS.password
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('email should not be null or undefined');
    }
  });

  test('Should not create User without password', async () => {
    try {
      await User.create({
        _id: CONSTS._id,
        name: CONSTS.name,
        email: CONSTS.email,
        password: undefined
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('password should not be null or undefined');
    }
  });

  test('Should not create User with name length lower than five', async () => {
    try {
      await User.create({
        _id: CONSTS._id,
        name: 'name',
        email: CONSTS.email,
        password: CONSTS.password
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('name must be longer than or equal to 5 characters');
    }
  });

  test('Should not create User with invalid e-mail', async () => {
    try {
      await User.create({
        _id: CONSTS._id,
        name: CONSTS.name,
        email: 'invalidmail.com',
        password: CONSTS.password
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('email must be an email');
    }
  });

  test('Should not create User with password lower than 6', async () => {
    try {
      await User.create({
        _id: CONSTS._id,
        name: CONSTS.name,
        email: CONSTS.email,
        password: '12345'
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('password must be longer than or equal to 6 characters');
    }
  });

  test('Should not create User with password bigger than 20', async () => {
    try {
      await User.create({
        _id: CONSTS._id,
        name: CONSTS.name,
        email: CONSTS.email,
        password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('password must be shorter than or equal to 20 characters');
    }
  });
});
