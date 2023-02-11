import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';

@Injectable()
export class UpdateStatusService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async updateStatus(id: ObjectId, newStatus: string): Promise<Task> {
    const isStatusValid = await this.validateStatusChange(id, newStatus);

    if (isStatusValid) {
      return await this.taskModel.findByIdAndUpdate( id, 
        { status: newStatus }, 
        { new: true });
    } 
  }

  async getStatus(id: ObjectId): Promise<string> {
    const task = await this.taskModel.findById({ _id: id });

    return task.status;
  }

  async validateStatusChange(
    id: ObjectId,
    newStatus: string,
  ): Promise<boolean> {
    const currentStatus = await this.getStatus(id);

    if (currentStatus === 'to do' && newStatus === 'in progress') {
      return true;
    } else if (currentStatus === 'in progress' && newStatus === 'completed') {
      return true;
    } else if (currentStatus === 'completed' && newStatus === 'in progress') {
      return false;
    } else {
      return false;
    }
  }
}
