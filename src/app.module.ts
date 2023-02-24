import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TaskModule } from './tasks/task.module';
import { AuthModule } from './user/auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/task-manager'),
    TaskModule,
    UserModule,
    AuthModule
  ],
  controllers:[AppController],
  providers:[]
})
export class AppModule {}
