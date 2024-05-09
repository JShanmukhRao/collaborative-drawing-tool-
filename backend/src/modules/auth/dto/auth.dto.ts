import { User } from '@/modules/user/user.entity';
import { IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class RegisterUserDto extends PickType(User, [
  'name',
  'email',
  'password',
]) {
  @IsNotEmpty()
  confirmPassword: string;
}

export class LoginUserDto extends PickType(User, ['email', 'password']) {}
