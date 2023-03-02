import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { NotificationModule } from '../notifications/notification.module';
import { User, UserSchema } from '../schema/user.schema';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NotificationModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, BcryptService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
