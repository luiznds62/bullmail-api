import { Result } from '../../src/common/Result';
import { User } from '../../src/domain/user/User';

const CONSTS = {
  _id: 1,
  name: 'tester',
  email: 'test@test.com',
  password: '123456'
};

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

test('Should not create User', async () => {
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
