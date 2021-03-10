import { BadRequestError } from '../../../src/core/exception/BadRequestError';

describe('BadRequestError', () => {
  test('Should throw BadRequestError exception', () => {
    try {
      throw new BadRequestError('message');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(400);
      expect(error.message).toBe('message');
    }
  });
});
