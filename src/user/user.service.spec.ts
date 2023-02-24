import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import mongoose from 'mongoose';

describe('UserService', () => {
  let service: UserService;
  let userModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/task-manager', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });


  describe('getById', () => {
    it('should return the user with the specified ID', async () => {
      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
      };
    // //   const createdUser = await service.create(createUserDto);
    // //   const userId = createdUser._id;

    //   const foundUser = await service.getById(userId.toString());
    //   expect(foundUser).toBeDefined();
    //   expect(foundUser._id).toEqual(userId);
    //   expect(foundUser.username).toEqual(createUserDto.username);
    //   expect(foundUser.email).toEqual(createUserDto.email);
    //   expect(foundUser.name.firstName).toEqual(createUserDto.firstName);
    //   expect(foundUser.name.lastName).toEqual(createUserDto.lastName);
    });

    it('should return null if no user with the specified ID is found', async () => {
      const userId = new mongoose.Types.ObjectId();
      const foundUser = await service.getById(userId.toString());
      expect(foundUser).toBeNull();
    });
  });
});
