import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getById(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(username: string) {
    return await this.userModel.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        name: {
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
        },
      },
    );

    const updatedUser = await this.getById(id);
    return updatedUser.name;
  }

  async delete(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
