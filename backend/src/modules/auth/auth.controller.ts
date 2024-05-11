import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '../../shared/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body()
    registerDto: RegisterUserDto,
  ) {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  async loginUser(
    @Body()
    loginUserDto: LoginUserDto,
  ) {
    return await this.authService.loginUser(loginUserDto);
  }
}
