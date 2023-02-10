import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ObjectId } from 'mongoose';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //Task CRUD (Create, Read, Update, Delete) Operations

  @Get('/tasks/')
  async getTasks() {
    return this.taskService.getAll();
  }

  @Get('/tasks/:id')
  async getTaskByID(@Body() id: ObjectId) {
    return this.taskService.getByID(id);
  }

  @Post('/tasks/')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Put('/tasks/:id')
  async update(@Param('id') id: ObjectId , @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id,updateTaskDto);
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: ObjectId) {
    return this.taskService.delete(id);
  }
}
