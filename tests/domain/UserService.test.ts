import { BasicPage } from '../../src/core/BasicPage';
import { User } from '../../src/domain/user/User';
import { UserRepository } from '../../src/domain/user/UserRepository';
import { UserService } from '../../src/domain/user/UserService';

jest.mock('../../src/domain/user/UserRepository');

const CONSTS = {
  email: 'test@hotmail.com',
  pagination: {
    offset: 0,
    limit: 20,
    sort: ''
  },
  userProps: {
    _id: '123456',
    name: 'testes',
    email: 'test@hotmail.com',
    password: '12345678'
  },
  changedUser: 'Changed user',
  affecteds: 1
};

describe('UserService', () => {
  const usersPage = new BasicPage()
    .setContent([new User(CONSTS.userProps)])
    .setHasNext(false)
    .setTotal(1)
    .build();

  UserRepository.prototype.findAll = jest.fn().mockReturnValue(usersPage);
  UserRepository.prototype.findOne = jest.fn().mockReturnValue(new User(CONSTS.userProps));
  UserRepository.prototype.create = jest.fn().mockReturnValue(new User(CONSTS.userProps));
  UserRepository.prototype.findById = jest.fn().mockReturnValue(new User(CONSTS.userProps));
  UserRepository.prototype.delete = jest.fn().mockReturnValue(CONSTS.affecteds);
  const userRepository = new UserRepository();

  UserService.prototype.repository = userRepository;
  const service = new UserService();

  test('Should find All users with pagination props', async () => {
    const users: BasicPage<User> = await service.findAll(CONSTS.pagination.offset, CONSTS.pagination.limit, CONSTS.pagination.sort);

    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(BasicPage);
    expect(users.getContent()[0].getName()).toBe(CONSTS.userProps.name);
    expect(users.getContent()[0].getEmail()).toBe(CONSTS.userProps.email);
    expect(users.getContent()[0].getPassword()).toBe(CONSTS.userProps.password);
    expect(users.getTotal()).toBe(1);
    expect(users.getHasNext()).toBe(false);
  });

  test('Should find User by id', async () => {
    const user: User = await service.findById(CONSTS.userProps._id);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(CONSTS.userProps.name);
    expect(user.getEmail()).toBe(CONSTS.userProps.email);
    expect(user.getPassword()).toBe(CONSTS.userProps.password);
  });

  test('Should create User', async () => {
    const user: User = await service.create(CONSTS.userProps);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(CONSTS.userProps.name);
    expect(user.getEmail()).toBe(CONSTS.userProps.email);
    expect(user.getPassword()).toBe(CONSTS.userProps.password);
  });

  test('Should update User', async () => {
    const user: User = await service.create(CONSTS.userProps);

    user.setName(CONSTS.changedUser);
    const userUpdated: User = await service.merge(user._id, user);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(CONSTS.changedUser);
    expect(user.getEmail()).toBe(CONSTS.userProps.email);
    expect(user.getPassword()).toBe(CONSTS.userProps.password);
  });

  test('Should delete User', async () => {
    const affecteds = await service.delete(CONSTS.userProps._id);

    expect(affecteds).toBeDefined();
    expect(affecteds).toBe(CONSTS.affecteds);
  });

  test('Should find User by e-mail', async () => {
    const user: User = await service.findByEmail('test@hotmail.com');

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe(CONSTS.userProps.name);
    expect(user.getEmail()).toBe(CONSTS.userProps.email);
    expect(user.getPassword()).toBe(CONSTS.userProps.password);
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
