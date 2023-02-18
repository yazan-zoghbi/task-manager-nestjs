import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async getById(id: ObjectId) {
    return await this.userModel.findById(id);
  }

  async findOne(username: string) {
    return await this.userModel.findOne({ username });
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({
      _id: id,
      name: {
        firstName: updateUserDto.name.firstName,
        lastName: updateUserDto.name.lastName,
      },
    });
  }

  async delete(id: ObjectId) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
