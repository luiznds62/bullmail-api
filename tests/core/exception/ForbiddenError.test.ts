import { ForbiddenError } from '../../../src/core/exception/ForbiddenError';

describe('ForbiddenError', () => {
  test('Should throw ForbiddenError exception', () => {
    try {
      throw new ForbiddenError('Access denied');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(403);
      expect(error.message).toBe('Access denied');
    }
  });
});
