import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';

@Injectable()
export class EmailNotificationService {
  private mailTransport;

  constructor(private configService: ConfigService) {
    const SMTP_HOST = this.configService.get<string>('SMTP_HOST');
    const SMTP_PORT = this.configService.get<number>('SMTP_PORT');

    this.mailTransport = createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // Set to true if your SMTP server requires a secure connection
      tls: {
        rejectUnauthorized: false // Set to true if your SMTP server uses a self-signed certificate
      }
    });
  }

  async send(sendEmailNotificationDto: SendEmailNotificationDto) {
    const { from, to, subject, text } = sendEmailNotificationDto;

    const mailOptions = {
      from,
      to,
      subject,
      text
    };

    try {
      const info = await this.mailTransport.sendMail(mailOptions);
      console.log(`Message sent to ${to}. Message Id: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error(`Error sending email to ${to}. Error: ${error}`);
      throw error;
    }
  }
}
