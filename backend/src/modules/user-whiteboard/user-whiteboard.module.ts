import { Module } from '@nestjs/common';
import { UserWhiteboardService } from './user-whiteboard.service';
import { UserWhiteboardController } from './user-whiteboard.controller';
import { UserModule } from '../user/user.module';
import { WhiteboardModule } from '../whiteboard/whiteboard.module';

@Module({
  providers: [UserWhiteboardService],
  controllers: [UserWhiteboardController],
  imports: [UserModule, WhiteboardModule],
})
export class UserWhiteboardModule {}
