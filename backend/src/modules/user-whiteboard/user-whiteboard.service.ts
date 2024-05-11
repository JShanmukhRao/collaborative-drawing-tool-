import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { WhiteboardService } from '../whiteboard/whiteboard.service';
import { UserService } from '../user/user.service';
import { CreateWhiteboardDto } from '@/shared/dtos/whiteboard.dto';

@Injectable()
export class UserWhiteboardService {
  private readonly logger = new Logger(UserWhiteboardService.name);
  constructor(
    private whiteboardService: WhiteboardService,
    private userService: UserService,
  ) {}

  async createWhiteboard(createWhiteboardDto: CreateWhiteboardDto) {
    const user = await this.userService.findUserById(
      createWhiteboardDto.userId,
    );

    if (!user) {
      this.logger.error('User not found');
      throw new UnprocessableEntityException('User not found');
    }
    const isWhiteboardExist =
      await this.whiteboardService.fetchWhiteboardByRoomId(
        createWhiteboardDto.roomId,
      );

    if (isWhiteboardExist) {
      this.logger.error('Whiteboard already exist');
      throw new UnprocessableEntityException('Whiteboard already exist');
    }
    const whiteboard = await this.whiteboardService.createWhiteboard(
      createWhiteboardDto,
    );
    // add white board to user database
    await this.userService.addWhiteboardToUser(user, whiteboard.insertedId);
    return whiteboard;
  }
}
