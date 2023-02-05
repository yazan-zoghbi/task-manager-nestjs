import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './tasks/task.controller';
import { TaskService } from './tasks/task.service';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/task-manager")],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
