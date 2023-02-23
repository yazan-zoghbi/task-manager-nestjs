import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthService } from './user/auth/auth.service';
import { JwtAuthGuard } from './user/auth/jwt-auth.guard';
import { LocalAuthGuard } from './user/auth/local-auth.guard';
import { SignupUserDto } from './user/dto/signup-user.dto';
import { LoginUserDto } from './user/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginUserDto:LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('auth/signup')
  async signup(@Body() signupUserDto:SignupUserDto){
    return this.authService.signup(signupUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
