import { Module } from '@nestjs/common';
import { OneSignalService } from './onesignal.service';

@Module({
  imports: [],
  providers: [OneSignalService],
})
export class OneSignalModule {}
