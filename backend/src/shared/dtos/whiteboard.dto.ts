import { PickType } from '@nestjs/mapped-types';
import { Whiteboard } from '../entities/whiteboard.entity';
import { IsString } from 'class-validator';

export class CreateWhiteboardDto extends PickType(Whiteboard, [
  'roomId',
  'name',
  'description',
]) {
  @IsString()
  userId: string;
}

export class UpdateCanvasDto extends PickType(Whiteboard, [
  'canvasData',
  'roomId',
]) { }

export class DrawRoomPayload {
  roomId: string;
  toDataUrl: string;
}
