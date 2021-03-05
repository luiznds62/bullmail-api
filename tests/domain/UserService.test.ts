import { BasicPage } from '../../src/core/BasicPage';
import { User } from '../../src/domain/user/User';
import { UserRepository } from '../../src/domain/user/UserRepository';
import { UserService } from '../../src/domain/user/UserService';
import { USER_CONSTS } from './UserTestUtils';

jest.mock('../../src/domain/user/UserRepository');

describe('UserService', () => {
  const usersPage = new BasicPage()
    .setContent([new User(USER_CONSTS.userProps)])
    .setHasNext(false)
    .setTotal(1)
    .build();

  UserRepository.prototype.findAll = jest.fn().mockReturnValue(usersPage);
  UserRepository.prototype.findOne = jest.fn().mockReturnValue(new User(USER_CONSTS.userProps));
  UserRepository.prototype.create = jest.fn().mockReturnValue(new User(USER_CONSTS.userProps));
  UserRepository.prototype.findById = jest.fn().mockReturnValue(new User(USER_CONSTS.userProps));
  UserRepository.prototype.delete = jest.fn().mockReturnValue(USER_CONSTS.affecteds);
  const userRepository = new UserRepository();

  UserService.prototype.repository = userRepository;
  const service = new UserService();

  test('Should find All users with pagination props', async () => {
    const users: BasicPage<User> = await service.findAll(USER_CONSTS.pagination.offset, USER_CONSTS.pagination.limit, USER_CONSTS.pagination.sort);

    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(BasicPage);
    expect(users.getContent()[0].getName()).toBe(USER_CONSTS.userProps.name);
    expect(users.getContent()[0].getEmail()).toBe(USER_CONSTS.userProps.email);
    expect(users.getContent()[0].getPassword()).toBe(USER_CONSTS.userProps.password);
    expect(users.getTotal()).toBe(1);
    expect(users.getHasNext()).toBe(false);
  });

  test('Should find User by id', async () => {
    const user: User = await service.findById(USER_CONSTS.userProps._id);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(USER_CONSTS.userProps.name);
    expect(user.getEmail()).toBe(USER_CONSTS.userProps.email);
    expect(user.getPassword()).toBe(USER_CONSTS.userProps.password);
  });

  test('Should create User', async () => {
    const user: User = await service.create(USER_CONSTS.userProps);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(USER_CONSTS.userProps.name);
    expect(user.getEmail()).toBe(USER_CONSTS.userProps.email);
    expect(user.getPassword()).toBe(USER_CONSTS.userProps.password);
  });

  test('Should update User', async () => {
    const user: User = await service.create(USER_CONSTS.userProps);

    user.setName(USER_CONSTS.changedUser);
    const userUpdated: User = await service.merge(user._id, user);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(USER_CONSTS.changedUser);
    expect(user.getEmail()).toBe(USER_CONSTS.userProps.email);
    expect(user.getPassword()).toBe(USER_CONSTS.userProps.password);
  });

  test('Should delete User', async () => {
    const affecteds = await service.delete(USER_CONSTS.userProps._id);

    expect(affecteds).toBeDefined();
    expect(affecteds).toBe(USER_CONSTS.affecteds);
  });

  test('Should find User by e-mail', async () => {
    const user: User = await service.findByEmail('test@hotmail.com');

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(USER_CONSTS.userProps.name);
    expect(user.getEmail()).toBe(USER_CONSTS.userProps.email);
    expect(user.getPassword()).toBe(USER_CONSTS.userProps.password);
  });

  test('Should return true when password match hash', () => {
    const bool = service.isPasswordMatch('12345678911', '$2a$10$8Wed/lnrV46HCqOIxxFTNOiM68xyRcxAfjH5e1EFvoyivJSnPo.sC');

    expect(bool).toBe(true);
  });

  test('Should return false when password dont match hash', () => {
    const bool = service.isPasswordMatch('test', 'test');

    expect(bool).toBe(false);
  });
});
