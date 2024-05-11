import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from './user.entity';
import { ObjectId } from 'mongodb';

export class Whiteboard {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description = '';

  @IsString()
  canvasData: string;

  // @ManyToOne(() => User)
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
