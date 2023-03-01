import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OneSignalModule } from 'src/modules/onesignal/onesignal.module';
import { EmailNotificationService } from './email-notification.service';
import { PushNotificationService } from './push-notification.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
  }), OneSignalModule ],
  providers: [EmailNotificationService, PushNotificationService],
  exports: [EmailNotificationService]
})
export class NotificationModule {}
