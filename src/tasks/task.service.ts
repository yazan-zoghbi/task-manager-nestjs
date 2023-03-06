import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private readonly tasks: Task[] = [];
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }
  async getAll(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async getByID(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    return await this.taskModel.updateOne({
      _id: id,
      title: updateTaskDto.title,
      description: updateTaskDto.description,
    });
  }

  async delete(id: ObjectId) {
    return await this.taskModel.deleteOne({ _id: id });
  }

  async addAssignees(taskid: string, userid: string[]) {
    return await this.taskModel.updateOne(
      { _id: taskid },
      { assignedTo: userid },
    );
  }
}
