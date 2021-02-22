import { BasicEmail } from "./BasicEmail";
import { User } from "../domain/user/User";

export class RegistrationMail extends BasicEmail {

    constructor() {
        super();
    }

    async generate(user: User) {
        this.setTitle(`${user.getName()}</b>, Welcome :)`);
        this.setPreheader(`<small>This e-mail is for the activation of your account</small><br/>`);
        this.setGreeting(`<strong>We're so proud to have you as our new User!</strong><br/>`);
        this.setContent(`<a href="" target="_blank">Click in this link to have full access to your account features</a>`);
        this.setEnding(`<p>If you have any doubts just reply this</p>`);
        this.setMeta(`Best regards :D`);

        return this.compile();
    }
}