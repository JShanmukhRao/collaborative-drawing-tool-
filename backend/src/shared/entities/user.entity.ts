import { Roles } from '@/shared/enums/roles.enum';
import { IsEmail, IsString, Length, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';

export class User {
  _id: ObjectId;
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  role: Roles = Roles.USER;

  @IsString()
  @Length(6, 20)
  password: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = this._id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
