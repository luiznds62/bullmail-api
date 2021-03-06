import { ValidationError } from '../../../src/core/exception/ValidationError';

describe('ValidationError', () => {
  test('Should throw ValidationError exception', () => {
    try {
      throw new ValidationError(422, 'message');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(422);
      expect(error.message).toBe('message');
    }
  });
});
