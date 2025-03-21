import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugin'

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}

export interface Attachment {
    fileName: string;
    path: string;
}

export class EmailService {

    constructor() { }

    private transport = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { htmlBody, subject, to, attachments = [] } = options;

        try {
            const emailSent = await this.transport.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });
            // console.log(emailSent, true);
            return true;
        }
        catch (error) {
            console.log(error, false);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subjects = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Mollit irure est excepteur exercitation.</p>
            <p>Ver logs adjuntos</p>
        `;
        const attachments: Attachment[] = [
            { fileName: 'logs-low.log', path: './logs/logs-low.log', },
            { fileName: 'logs-medium.log', path: './logs/logs-medium.log', },
            { fileName: 'logs-high.log', path: './logs/logs-high.log', }
        ]
        try {
            return this.sendEmail({
                to: to,
                subject: subjects,
                attachments: attachments,
                htmlBody: htmlBody
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
