import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  CreateWhiteboardDto,
  UpdateCanvasDto,
} from '../../shared/dtos/whiteboard.dto';
import { WhiteboardService } from './whiteboard.service';

@Controller('/whiteboard')
export class WhiteboardController {
  constructor(private whiteboardService: WhiteboardService) {}

  @Get()
  async fetchWhiteboards() {}

  @Get('/:roomId')
  async fetchWhiteboardByRoomId(@Param('roomId') roomId: string) {
    return await this.whiteboardService.fetchWhiteboardByRoomId(roomId);
  }

  @Patch('/canvas')
  async updateCanvas(@Body() updateCanvasDto: UpdateCanvasDto) {
    return await this.whiteboardService.updateCanvas(updateCanvasDto);
  }
}
