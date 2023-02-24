import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), BcryptModule, JwtModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
