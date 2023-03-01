import { Injectable } from '@nestjs/common';
import { SendPushNotificationDto } from './dto/send-push-notification.dto';

@Injectable()
export class PushNotificationService {
  constructor(private readonly notification) {}

  async send(sendPushNotificationDto: SendPushNotificationDto) {
  }
}
