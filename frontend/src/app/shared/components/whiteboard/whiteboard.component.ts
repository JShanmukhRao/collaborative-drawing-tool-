import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { environment } from 'src/environment/environment';
import { ActivatedRoute } from '@angular/router';
import { Whiteboard } from '../../entities/whiteboard.entity';
import { WhiteboardService } from '../../services/whiteboard.service';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-white-board',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  isDrawing: boolean = false;
  selectedColor: string = 'black';
  roomId: string = '';
  whiteboardData!: Whiteboard;
  canvasContext!: CanvasRenderingContext2D;
  private timeoutId: any;

  constructor(
    private webSocketService: WebSocketService,
    private whiteboardService: WhiteboardService,
    private route: ActivatedRoute
  ) { }
  onMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
    }
    console.log('mouse down', event, this.isDrawing);

  }
  onMouseMove(event: MouseEvent): void {
    if (this.isDrawing) {
      const ctx = this.canvas.nativeElement.getContext('2d');
      if (ctx) {
        // ctx.beginPath();
        ctx.strokeStyle = this.selectedColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        // Clear the previous timeout if it exists
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }

        // Set a new timeout to send the data after 1 second
        this.timeoutId = setTimeout(() => {
          const toDataUrl = this.canvas.nativeElement.toDataURL("image/png");
          console.log('mouse move', toDataUrl);
          this.webSocketService.send(Constants.DRAW_EVENT, {roomId:this.roomId,toDataUrl});
        }, 500);
      }

    }
  }

  enableErase(): void {
    this.selectedColor = 'white';

  }
  onMouseUp(event: MouseEvent): void {
    this.isDrawing = false;
    console.log('mouse up', event, this.isDrawing);
    const ctx = this.canvas.nativeElement.getContext('2d');
  }

  onMouseLeave(event: MouseEvent): void {
    this.isDrawing = false;
    console.log('mouse leave', event, this.isDrawing);
  }

  joinDrawRoom(roomId: string): void {
    this.webSocketService.send(Constants.JOIN_DRAW_ROOM, roomId);
  }

  subscribeToDrawEvent(): void {
    this.webSocketService.onEvent(Constants.DRAW_EVENT).subscribe((data: any) => {
      const toDataUrl = data.toDataUrl;
      console.log('draw event', data);
      if (toDataUrl && this.canvasContext) {
        const img = new Image();
        img.onload = () => {
          this.canvasContext.drawImage(img, 0, 0);
        };
        img.src = toDataUrl;
      }

    });
  }

  connectToWebSocket(): void {
    this.webSocketService.connect(environment.wsUrl);
    this.subscribeToDrawEvent();
  }

  subscribeWhiteboardData(): void {
    this.whiteboardService.whiteboardData.subscribe((data: Whiteboard) => {
      this.whiteboardData = data;
      console.log(data);
      if (data.totoDataUrl && this.canvasContext) {
        const img = new Image();
        img.onload = () => {
          this.canvasContext.drawImage(img, 0, 0);
        };
        img.src = data.totoDataUrl;
      }
    })
  }
  async ngOnInit() {
    // connect to websocket
    this.subscribeWhiteboardData();
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      this.canvasContext = ctx;
      this.connectToWebSocket();

      // subscribe to the room
      this.route.params.subscribe(params => {
        this.roomId = params['roomId'];
        this.joinDrawRoom(this.roomId);
        console.log("roomId", params['roomId']);

      });
    }

    // fetch latest canvas data



  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}
