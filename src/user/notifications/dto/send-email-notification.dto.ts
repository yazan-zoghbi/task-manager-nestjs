import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SendEmailNotificationDto{
    @IsEmail()
    @IsNotEmpty()
    from: string

    @IsEmail()
    @IsNotEmpty()
    to: string

    @IsString()
    @IsNotEmpty()
    subject: string

    @IsString()
    @IsNotEmpty()
    text: string
}