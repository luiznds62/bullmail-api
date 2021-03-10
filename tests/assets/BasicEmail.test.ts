import { BasicEmail } from '../../src/assets/BasicEmail';

describe('BasicEmail', () => {
  test('Should construct new Basic Email', () => {
    const email = new BasicEmail();

    expect(email).toBeDefined();
  });

  test('Should set title', () => {
    const email = new BasicEmail();

    email.setTitle('Test');
    expect(email).toBeDefined();
  });

  test('Should set preheader', () => {
    const email = new BasicEmail();

    email.setPreheader('Test');
    expect(email).toBeDefined();
  });

  test('Should set greeting', () => {
    const email = new BasicEmail();

    email.setGreeting('Test');
    expect(email).toBeDefined();
  });

  test('Should set content', () => {
    const email = new BasicEmail();

    email.setContent('Test');
    expect(email).toBeDefined();
  });

  test('Should set ending', () => {
    const email = new BasicEmail();

    email.setEnding('Test');
    expect(email).toBeDefined();
  });

  test('Should set meta', () => {
    const email = new BasicEmail();

    email.setMeta('Test');
    expect(email).toBeDefined();
  });

  test('Should return html', () => {
    const email = new BasicEmail();

    email.setTitle('test');
    email.setPreheader('test');
    email.setGreeting('test');
    email.setContent('test');
    email.setEnding('test');
    email.setMeta('test');

    const result = email.source();

    expect(result).toBeDefined();
  });
});
