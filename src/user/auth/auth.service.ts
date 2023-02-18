import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.services';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    const passwordMatch = this.bcryptService.comparePassword(
      password,
      user.password,
    );

    if (user && passwordMatch) {
      return user;
    }

    return null;
  }

  async login(user) {
    const payload = { id: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
