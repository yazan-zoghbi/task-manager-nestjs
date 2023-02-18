import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './user/auth/auth.service';
import { JwtAuthGuard } from './user/auth/jwt-auth.guard';
import { LocalAuthGuard } from './user/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
