import { MongoRepository } from '@/shared/repository/mongo.repository';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserRepository {
  USER_COLLECTION = 'user';
  constructor(private mongoRepo: MongoRepository) {}

  async insertOne(userData: any) {
    const date = new Date();
    const result = await this.mongoRepo.insertOne(this.USER_COLLECTION, {
      ...userData,
      createdAt: date,
      updatedAt: date,
    });

    return result;
  }

  async findById(
    id: string,
    options: any = {
      projection: {
        password: 0,
      },
    },
  ) {
    const result: any = await this.mongoRepo.findOne(
      this.USER_COLLECTION,
      {
        _id: new ObjectId(id),
      },
      options,
    );
    if (result) {
      return {
        ...result,
        id: result._id,
        _id: undefined,
      };
    }
    return null;
  }

  async findByEmail(email: string) {
    const result: any = await this.mongoRepo.findOne(this.USER_COLLECTION, {
      email,
    });
    if (result) {
      return {
        ...result,
        id: result._id,
        _id: undefined,
      };
    }
    return null;
  }
  async findAll() {
    const result = await this.mongoRepo.find(
      this.USER_COLLECTION,
      {},
      {
        projection: {
          password: 0,
        },
      },
    );
    return result;
  }

  async updateOne(filter: any, update: any, options?: any) {
    const result = await this.mongoRepo.updateOne(
      this.USER_COLLECTION,
      filter,
      update,
      options,
    );
    return result;
  }
}
