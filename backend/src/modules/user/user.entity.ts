import { IsEmail, IsString, Length } from 'class-validator';

export class User {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
