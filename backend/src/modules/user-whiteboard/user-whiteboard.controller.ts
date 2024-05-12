import { Body, Controller, Post } from '@nestjs/common';
import { UserWhiteboardService } from './user-whiteboard.service';
import { CreateWhiteboardDto } from '@/shared/dtos/whiteboard.dto';

@Controller()
export class UserWhiteboardController {
  constructor(private userWhiteboardService: UserWhiteboardService) {}
  @Post('whiteboard')
  createWhiteboard(@Body() createWhiteboardDto: CreateWhiteboardDto) {
    return this.userWhiteboardService.createWhiteboard(createWhiteboardDto);
  }
}
