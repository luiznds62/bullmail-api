import { errorHandler } from '../../src/common/ErrorHandler';
import { NotFoundError } from '../../src/core/exception/NotFoundError';

describe('ErrorHandler', () => {
  const req: any = jest.fn();
  const next: any = jest.fn();

  const res: any = {
    status: jest.fn().mockImplementation((status) => {
      expect(status).toBeDefined();
      expect(status).toBe(404);
    }),
    json: jest.fn().mockImplementation((response) => {
      expect(response).toBeDefined();
      expect(response.message).toBe('Document not found');
    })
  };

  test('Should handle error', () => {
    errorHandler(new NotFoundError('Document not found'), req, res, next);
  });
});
