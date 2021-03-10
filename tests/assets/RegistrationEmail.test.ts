import { RegistrationMail } from '../../src/assets/RegistrationMail';
import { User } from '../../src/domain/user/User';
import { USER_CONSTS } from '../domain/UserTestUtils';

describe('RegistrationMail', () => {
  test('Should construct RegistrationMail', () => {
    const email = new RegistrationMail();

    expect(email).toBeDefined();
  });

  test('Should generate registration mail', () => {
    const email = new RegistrationMail();

    const result = email.generate(new User(USER_CONSTS.userProps));

    expect(result).toBeDefined();
  });
});
