import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/task-manager"), TaskModule],

})
export class AppModule {}
