import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { SendEmailNotificationDto } from './dto/send-email-notification.dto';

@Injectable()
export class EmailNotificationService {
  private transporter;
  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('USER'),
        pass: this.configService.get<string>('PASSWORD'),
      },
    });
  }

  async send(
    sendEmailNotificationDto: SendEmailNotificationDto,
  ) {
    await this.transporter.sendMail(sendEmailNotificationDto);
  }
}
