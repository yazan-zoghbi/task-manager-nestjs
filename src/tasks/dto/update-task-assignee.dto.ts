import { IsArray } from 'class-validator';

export class updateTaskAssigneeDto {
  @IsArray()
  usersIds: string[];
}
