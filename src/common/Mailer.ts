import * as nodemailer from "nodemailer";
import { Singleton } from "typescript-ioc";
import environment from "../common/Environments";
import { logger } from "./Logger";

interface IEmailOptions {
    from: string;
    to: string;
    subject?: string;
    text?: string;
    html?: string;
}
@Singleton
export class Mailer {

    private transporter: any;

    constructor() {
        this.createTransport();
        this.verifyConnection();
    }

    private verifyConnection() {
        this.transporter.verify(function (error) {
            if (error) {
                logger.debug(`An error ocurred while trying to stabilish connection with the mail server: ${error.message}`);
            } else {
                logger.debug("Mail Server is ready to receive messages");
            }
        });
    }

    private createTransport() {
        this.transporter = nodemailer.createTransport({
            host: environment.MAIL.HOST,
            port: environment.MAIL.PORT,
            secure: false,
            auth: {
                user: environment.MAIL.AUTH.USER,
                pass: environment.MAIL.AUTH.PASS
            }
        });
    }

    async send(config: IEmailOptions) {
        return await this.transporter.sendMail({
            from: config.from,
            to: config.to,
            subject: config.subject,
            text: config.text,
            html: config.html
        });
    }

}