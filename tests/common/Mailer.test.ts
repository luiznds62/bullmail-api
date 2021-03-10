import 'dotenv/config';
import { Mailer } from '../../src/common/Mailer';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');

const verify = jest.fn().mockImplementation((fn) => {
  fn((error) => {
    expect(error).not.toBeDefined();
  });
});

const createTransport = {
  verify: verify,
  sendMail: jest.fn().mockReturnValue('Email sended')
};

const EMAIL_CONSTS = {
  from: 'test@hotmail.com',
  to: 'test2@hotmail.com',
  subject: 'config.subject',
  text: 'config.text',
  html: '<h1>test</h1>'
};

describe('Mailer', () => {
  (<any>nodemailer).createTransport.mockImplementation(() => {
    return createTransport;
  });

  test('Should construct new Mailer', () => {
    const mailer = new Mailer();

    expect(mailer).toBeDefined();
  });

  test('Should send e-mail', () => {
    Mailer.prototype.send = jest.fn().mockReturnValue(true);
    const mailer = new Mailer();
    const mail = mailer.send(EMAIL_CONSTS);

    expect(mail).toBeDefined();
  });
});
