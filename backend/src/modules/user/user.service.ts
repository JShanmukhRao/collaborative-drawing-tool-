import { HttpException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../../shared/dtos/auth.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: RegisterUserDto) {
    const { password, confirmPassword, ...userData } = user;
    if (password !== confirmPassword) {
      throw new HttpException(
        {
          message: 'Password and confirm password do not match',
        },
        400,
      );
    }
    if (await this.userRepository.findByEmail(userData.email)) {
      throw new HttpException(
        {
          message: 'Email already exists',
        },
        400,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.userRepository.insertOne({
      ...userData,
      password: hashedPassword,
    });
    return {
      id: result.insertedId,
      email: userData.email,
    };
  }

  async findUserById(id: string) {
    return this.userRepository.findById(id);
  }

  async addWhiteboardToUser(user: any, whiteboardId: ObjectId) {
    const updatedUser = await this.userRepository.updateOne(
      { _id: user._id },
      { $push: { whiteboards: whiteboardId } },
    );
    return updatedUser;
  }
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          message: 'Invalid credentials',
        },
        400,
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException(
        {
          message: 'Invalid credentials',
        },
        401,
      );
    }
    return user;
  }
}
