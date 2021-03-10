import { User } from '../../src/domain/user/User';
import { UserService } from '../../src/domain/user/UserService';
import { TokenParser } from '../../src/security/TokenParser';
import { USER_CONSTS } from '../domain/UserTestUtils';
import * as jwt from 'jsonwebtoken';

jest.mock('../../src/domain/user/UserService');
jest.mock('jsonwebtoken');

const CONSTS = {
  accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsdWl6bmRzQGhvdG1haWwuY29tIiwiaXNzIjoiYnVsbG1haWwtYXBpIiwiaWF0IjoxNjE1MDYzNjE0LCJleHAiOjE2MTUwNjcyMTR9.nyt_WZwDhOFGlJO9o3ENzKQN5Kj0N4OjriRGTKyMW7o'
};

describe('TokenParser', () => {
  UserService.prototype.findByEmail = jest.fn().mockReturnValue(new User(USER_CONSTS.userProps));

  const req = {
    header: jest.fn().mockImplementation(() => {
      return CONSTS.accessToken;
    })
  };

  const next = jest.fn().mockImplementation(() => {
    return true;
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  TokenParser.prototype.userService = new UserService();
  const tokenParser: TokenParser = new TokenParser();

  test('Should extract token', () => {
    const token = tokenParser.extractToken(<any>req);

    expect(token).toBeDefined();
    expect(token).toBe(CONSTS.accessToken.substring(7));
  });

  test('Should apply bearer', async () => {
    const nextFunction = jest.fn();
    const applied = tokenParser.applyBearer(<any>{}, nextFunction);

    await applied(false, true);
    expect(nextFunction).toHaveBeenCalled();
  });

  test('Should parse request', async () => {
    try {
      await tokenParser.parse(<any>req, <any>{}, next);
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });

  test('Should next parse request when token is not present', async () => {
    await tokenParser.parse(
      <any>{
        header: jest.fn().mockImplementation(() => {
          return null;
        })
      },
      <any>{},
      next
    );
  });
});
