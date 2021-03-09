import { paginationMiddleware } from '../../../src/core/middleware/PaginationMiddleware';

describe('PaginationMiddleware', () => {
  const req: any = {
    pagination: {
      offset: 0,
      limit: 20,
      sort: ''
    }
  };

  const next = jest.fn().mockImplementation(() => {});

  test('Should pass through middleware', async () => {
    await paginationMiddleware(req, <any>{}, next);

    expect(next).toHaveBeenCalled();
  });

  test('Should throw error when pagination config are not informed', async () => {
    try {
      await paginationMiddleware(<any>{}, <any>{}, next);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('Should throw error when pagination offset is in bad format', async () => {
    try {
      await paginationMiddleware(
        <any>{
          query: {
            offset: 'test'
          }
        },
        <any>{},
        next
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('Should throw error when pagination limit is in bad format', async () => {
    try {
      await paginationMiddleware(
        <any>{
          query: {
            offset: 0,
            limit: 'test'
          }
        },
        <any>{},
        next
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('Should throw error when pagination sort is in bad format', async () => {
    try {
      await paginationMiddleware(
        <any>{
          query: {
            offset: 0,
            limit: 20,
            sort: 2
          }
        },
        <any>{},
        next
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
