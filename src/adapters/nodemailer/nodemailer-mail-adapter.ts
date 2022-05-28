import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6f87ba4c60d8de",
      pass: "2584b55e776fa6"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <exemplo@feedget.com>",
            to: "Maurício de Carvalho <mauriciocr223@gmail.com>",
            subject,
            html: body,
        });
    }
}