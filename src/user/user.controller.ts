import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get a user by id
  @ApiParam({ name: 'id', type: String })
  @Get('/user/:id')
  async getUser(@Param('id') id: ObjectId) {
    return this.userService.getById(id);
  }

  // Create a new user
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserDto })
  @Post('/user/')
  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Update a user by id
  @ApiParam({ name: 'id', type: String })
  @Put('/user/:id')
  async update(@Param('id') id: ObjectId, updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // Delete a user by id
  @ApiParam({ name: 'id', type: String })
  @Delete('/user/:id')
  async delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }
}
