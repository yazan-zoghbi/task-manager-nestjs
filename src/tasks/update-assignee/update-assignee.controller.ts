import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { updateTaskAssigneeDto } from '../dto/update-task-assignee.dto';
import { UpdateTaskAssigneeService } from './update-assignee.service';

@Controller()
export class updateAssigneeController {
  constructor(private updateAssigneeService: UpdateTaskAssigneeService) {}

  @Get('task/assignee/:id')
  async getTaskAssignees(@Param('id') id: string) {
    return this.updateAssigneeService.getAssignees(id);
  }

  @Put('task/assignee/:id')
  async updateTaskAssignee(
    @Param('id') id: string,
    @Body() updateTaskAssignee:updateTaskAssigneeDto,
  ) {
    return await this.updateAssigneeService.addAssignee(id, updateTaskAssignee.usersIds);
  }
}
