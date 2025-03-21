import { EmailService, SendEmailOptions } from "./email.service"
import nodemailer from 'nodemailer';

describe('Email service', () => {

    const mockSendMail = jest.fn();

    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    const emailService = new EmailService();

    test('should send email', async () => {


        const options: SendEmailOptions = {
            to: 'alanlb196@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        };

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            to: "alanlb196@gmail.com",
            subject: "Test",
        });
    });

    test('should send email with attachments', async () => {

        const email = 'alanlb196@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { fileName: 'logs-low.log', path: './logs/logs-low.log', },
                { fileName: 'logs-medium.log', path: './logs/logs-medium.log', },
                { fileName: 'logs-high.log', path: './logs/logs-high.log', }
            ])
        });

    })
})