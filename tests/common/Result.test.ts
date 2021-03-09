import { response } from 'express';
import { Result } from '../../src/common/Result';

describe('Result', () => {
  test('Should create Result', () => {
    const result = new Result(true, null, { obj: {} });

    expect(result).toBeDefined();
  });

  test('Should throw error when error is not null', () => {
    try {
      new Result(false, true);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('InvalidOperation: A failing result needs to contain an error message');
    }
  });

  test('Should throw error when error is not null and success is false', () => {
    try {
      new Result(false, false);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('InvalidOperation: A failing result needs to contain an error message');
    }
  });

  test('Should throw error when getValue in Result without success', () => {
    try {
      const result = new Result(false, { obj: 'obj' });

      result.getValue();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(`Can't get the value of an error result. Use 'errorValue' instead.`);
    }
  });

  test('Should return Fail Result', () => {
    const result = Result.fail({ obj: 'obj' });

    const errorValue = result.errorValue();
    expect(errorValue).toBeDefined();
    expect((<any>errorValue).obj).toBe('obj');
  });

  test('Should return error value', () => {
    const result = new Result(false, { obj: 'obj' });

    const errorValue = result.errorValue();
    expect(errorValue).toBeDefined();
    expect(errorValue.obj).toBe('obj');
  });

  test('Should throw error when error is not null and success is', () => {
    try {
      new Result(true, true);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('InvalidOperation: A result cannot be successful and contain an error');
    }
  });
});
