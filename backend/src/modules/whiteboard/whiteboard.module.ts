import { Module } from '@nestjs/common';
import { WhiteboardGateway } from './whiteboard.gateway';
import { WhiteboardService } from './whiteboard.service';
import { SharedModule } from '@/shared/shared.module';
import { WhiteboardController } from './whiteboard.controller';

@Module({
  imports: [SharedModule],
  providers: [WhiteboardGateway, WhiteboardService],
  exports: [WhiteboardService],
  controllers: [WhiteboardController],
})
export class WhiteboardModule {}
