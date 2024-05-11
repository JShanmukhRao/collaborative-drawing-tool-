import { Injectable } from '@nestjs/common';
import {
  CreateWhiteboardDto,
  UpdateCanvasDto,
} from '../../shared/dtos/whiteboard.dto';
import { MongoRepository } from '@/shared/repository/mongo.repository';
import { Constants } from '@/constants';
import { ObjectId } from 'mongodb';

@Injectable()
export class WhiteboardService {
  // Idealy we could write all db logic in repository
  constructor(private mongoRepo: MongoRepository) {}
  async createWhiteboard(createWhiteboardDto: CreateWhiteboardDto) {
    const whiteboard = {
      roomId: createWhiteboardDto.roomId,
      name: createWhiteboardDto.name,
      description: createWhiteboardDto.description,
      createdBy: new ObjectId(createWhiteboardDto.userId),
      createdAt: new Date(),
    };
    return await this.mongoRepo.insertOne(
      Constants.WHITEBOARD_COLLECTION,
      whiteboard,
    );
  }

  async fetchWhiteboardByRoomId(roomId: string) {
    let data = {};
    try {
      data = await this.mongoRepo.aggregate(Constants.WHITEBOARD_COLLECTION, [
        {
          $match: {
            roomId: roomId,
          },
        },
        {
          $lookup: {
            from: Constants.USER_COLLECTION,
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          $unwind: '$createdBy',
        },
        {
          $project: {
            _id: 1, // Include all fields from the main object
            roomId: 1,
            name: 1,
            description: 1,
            createdAt: 1,
            updatedAt: 1,
            'createdBy.id': '$createdBy._id', // Show id from createdBy
            'createdBy.email': 1, // Show email from createdBy
          },
        },
      ]);
      console.log(data);
    } catch (error) {
      throw error;
    }
    return data;
  }

  async updateCanvas(updateCanvasDto: UpdateCanvasDto) {
    return await this.mongoRepo.updateOne(
      Constants.WHITEBOARD_COLLECTION,
        { roomId:updateCanvasDto.roomId },
        { $set: { dataToUrl: updateCanvasDto.canvasData } },
    );
  }
}
