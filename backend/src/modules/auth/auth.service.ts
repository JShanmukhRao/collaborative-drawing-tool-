import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterUserDto) {
    return await this.userService.createUser(registerDto);
  }

  async loginUser(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    // check for the user
    const user = await this.userService.validateUser(email, password);
    if (user) {
      const { id, email, name } = user;
      const payload = {
        id,
        email,
        name,
      };
      const token = await this.generateToken(payload);
      return {
        token,
      };
    }
  }

  private async generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
