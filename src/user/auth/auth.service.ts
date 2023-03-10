import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';
import { SignupUserDto } from '../dto/signup-user.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { EmailNotificationService } from '../notifications/email-notification.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
    private emailNotificationService: EmailNotificationService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne(loginUserDto.username);
    if (!user) {
      throw { message: 'User not found', statusCode: 404 }; // User not found
    }

    const passwordMatch = await this.bcryptService.comparePassword(
      loginUserDto.password,
      user.password,
    );
    if (passwordMatch) {
      return { message: 'Authentication successful', statusCode: 200 }; // Authentication successful
    } else {
      throw { message: 'Incorrect password', statusCode: 401 }; // Password does not match
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      await this.validateUser(loginUserDto);
      const payload = { username: loginUserDto.username };
      return {
        access_token: this.jwtService.sign(payload),
        message: 'Authentication successful',
        statusCode: 200,
      };
    } catch (error) {
      throw { message: error.message, statusCode: error.statusCode };
    }
  }

  async signup(signupUserDto: SignupUserDto) {
    const createdUser = new this.userModel({
      _id: new mongoose.Types.ObjectId(),
      name: {
        firstName: signupUserDto.firstName,
        lastName: signupUserDto.lastName,
      },
      username: signupUserDto.username,
      email: signupUserDto.email,
      password: await this.bcryptService.hashingPassword(
        signupUserDto.password,
      ),
    });

    const emailNotification = {
      from: this.configService.get<string>('SENDER'),
      to: createdUser.email,
      subject: 'Your account created successfully!',
      text: 'Your account created with our app, please head to "take a tour", to get started using our app',
    };
    try {
      if (await createdUser.save()) {
        await this.emailNotificationService.send(emailNotification);
        console.log('email notification sent');
        return { message: 'User created successfully', statusCode: 201 };
      }
    } catch (error) {
      console.log(error);
      throw { message: 'Error creating user', statusCode: 500 };
    }
  }
}
