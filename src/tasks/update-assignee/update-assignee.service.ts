import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TaskService } from '../task.service';

@Injectable()
export class UpdateTaskAssigneeService {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  async getAssignees(taskId: string) {
    const task = await this.taskService.getByID(taskId);
    return { assignedTo: task.assignedTo };
  }

  async addAssignee(taskId: string, userIds: string[]) {
    const task = await this.taskService.getByID(taskId);
    if (!task) {
      throw new NotFoundException({
        status: 404,
        message: `Task with ID ${taskId} not found`,
      });
    }

    if (!userIds || userIds.length === 0) {
      throw new NotFoundException({
        status: 400,
        message: 'At least one user ID must be provided',
      });
    }

    const users = await this.userService.findManyById(userIds);
    const missingUsers = userIds.filter((id) => !users.some((user) => user.id === id));
    if (missingUsers.length > 0) {
      throw new NotFoundException({
        status: 404,
        message: `Users with IDs ${missingUsers.join(', ')} not found`,
      });
    }

    return this.taskService.addAssignees(taskId, userIds);
  }
}
