import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from "./task.controller";
import { TaskService } from './task.service';
import { Task, TaskSchema } from "./schemas/task.schema";
import { UpdateStatusController } from "./update-status/update-status.controller";
import { UpdateStatusService } from "./update-status/update-status.service";
import { UpdateTaskAssigneeService } from "./update-assignee/update-assignee.service";
import { updateAssigneeController } from "./update-assignee/update-assignee.controller";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [MongooseModule.forFeature([{name:Task.name , schema: TaskSchema}]), UserModule],
    controllers: [TaskController, UpdateStatusController, updateAssigneeController],
    providers:[TaskService, UpdateStatusService, UpdateTaskAssigneeService],
})

export class TaskModule{}