import { NotAuthorizedError } from '../../../src/core/exception/NotAuthorizedError';

describe('NotAuthorizedError', () => {
  test('Should throw NotAuthorizedError exception', () => {
    try {
      throw new NotAuthorizedError('message');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(401);
      expect(error.message).toBe('message');
    }
  });
});
