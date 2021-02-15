import * as nodemailer from "nodemailer";
import environment from "../common/Environments";

interface IEmailOptions {
    from: string;
    to: string;
    subject?: string;
    text?: string;
    html?: string;
}

export class Mailer {

    private transporter: any;

    constructor() {
        this.createTransport();
    }

    createTransport() {
        this.transporter = nodemailer.createTransport({
            host: environment.MAIL.HOST,
            port: environment.MAIL.PORT,
            secure: false,
            auth: {
                user: environment.MAIL.AUTH.USER,
                pass: environment.MAIL.AUTH.PASS
            },
        });
    }

    send(config: IEmailOptions) {
        return this.transporter.sendMail({
            from: config.from,
            to: config.to,
            subject: config.subject,
            text: config.text,
            html: config.html
        });
    }

}