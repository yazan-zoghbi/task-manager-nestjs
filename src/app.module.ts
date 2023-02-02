import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './task.service';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/task-manager")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
