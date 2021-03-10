import { NotFoundError } from '../../../src/core/exception/NotFoundError';

describe('NotFoundError', () => {
  test('Should throw NotFoundError exception', () => {
    try {
      throw new NotFoundError('message');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(404);
      expect(error.message).toBe('message');
    }
  });
});
