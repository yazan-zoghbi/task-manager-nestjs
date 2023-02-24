import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import {  ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get a user by id
  @ApiParam({ name: 'id', type: String })
  @Get('/user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  // Update a user by id
  @ApiParam({ name: 'id', type: String })
  @Put('/user/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // Delete a user by id
  @ApiParam({ name: 'id', type: String })
  @Delete('/user/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
