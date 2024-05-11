import { IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class RegisterUserDto extends PickType(User, [
  'name',
  'email',
  'password',
]) {
  @IsNotEmpty()
  confirmPassword: string;
}

export class LoginUserDto extends PickType(User, ['email', 'password']) {}
