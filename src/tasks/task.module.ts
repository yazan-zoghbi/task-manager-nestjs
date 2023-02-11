import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from "./task.controller";
import { TaskService } from './task.service';
import { Task, TaskSchema } from "./schemas/task.schema";
import { UpdateStatusController } from "./update-status/update-status.controller";
import { UpdateStatusService } from "./update-status/update-status.service";

@Module({
    imports: [MongooseModule.forFeature([{name:Task.name , schema: TaskSchema}])],
    controllers: [TaskController, UpdateStatusController],
    providers:[TaskService, UpdateStatusService],
})

export class TaskModule{}