import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto'; 
import { Task } from './schemas/task.schema';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/tasks/all')
  async getTasks() {
    return this.taskService.getAll();
  }

  @Post('/tasks/create')
  async create(@Body() createTaskDto:CreateTaskDto){
    return this.taskService.create(createTaskDto)
  }
}
