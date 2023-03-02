import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailNotificationService } from './email-notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [EmailNotificationService],
  exports: [EmailNotificationService],
})
export class NotificationModule {}
