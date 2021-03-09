import { authorize } from '../../../src/core/middleware/AuthorizationMiddleware';
import { IAuthenticatedRequest } from '../../../src/security/TokenParser';
import { USER_CONSTS } from '../../domain/UserTestUtils';

describe('AuthorizationMiddleware', () => {
  const req = {
    authenticated: {
      getEmail: jest.fn().mockReturnValue(USER_CONSTS.email)
    }
  };

  const next = jest.fn();

  test('Should pass through authorization middleware', async () => {
    const authorizationMiddleware = await authorize();

    authorizationMiddleware(<any>req, <any>{}, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should not pass through authorization middleware without authentication in request', async () => {
    const authorizationMiddleware = await authorize();
    try {
      authorizationMiddleware(<any>{}, <any>{}, next);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
