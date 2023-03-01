import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendPushNotificationDto {
  @IsEmail()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
