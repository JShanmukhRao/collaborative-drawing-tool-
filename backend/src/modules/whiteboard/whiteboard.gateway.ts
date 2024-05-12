import { UpdateCanvasDto } from '@/shared/dtos/whiteboard.dto';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WhiteboardService } from './whiteboard.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class WhiteboardGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WhiteboardGateway.name);
  constructor(private whiteboardService: WhiteboardService){}
  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('joinDrawRoom')
  handleJoinRoom(client: Socket, roomId: string): void {
    client.join(roomId);
    console.log(`Client id: ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('draw')
  async handleMessage(client: Socket, payload: UpdateCanvasDto) {
    await this.whiteboardService.updateCanvas(payload);
    this.logger.log(`Client id: ${client.id} payload: ${payload.roomId}`);

    client.broadcast.to(payload.roomId).emit('draw', payload);
    return payload;
  }
}
