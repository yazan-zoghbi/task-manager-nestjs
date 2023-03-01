import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OneSignal from '@onesignal/node-onesignal';

@Injectable()
export class OneSignalService {
  private client;
  constructor(private configService: ConfigService) {
    const configuration = OneSignal.createConfiguration({
      userKey: this.configService.get<string>('AUTH_KEY'),
      appKey: this.configService.get<string>('APP_KEY'),
    });
    this.client = new OneSignal.DefaultApi(configuration);
  }

  async sendNotification(message: string, userIds: string[]) {
    const notification = {
      contents: { en: message },
      include_player_ids: userIds,
    };

    try {
      const response = await this.client.createNotification(notification);
      console.log('OneSignal notification sent:', response.data);
    } catch (error) {
      console.error('Error sending OneSignal notification:', error);
    }
  }
}
