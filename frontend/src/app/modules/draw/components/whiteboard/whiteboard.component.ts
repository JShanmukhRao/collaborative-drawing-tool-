import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { WebSocketService } from '../../../../shared/services/web-socket.service';
import { environment } from 'src/environment/environment';
import { ActivatedRoute } from '@angular/router';
import { Whiteboard } from '../../../../shared/entities/whiteboard.entity';
import { WhiteboardService } from '../../../../shared/services/whiteboard.service';
import { Constants } from 'src/app/constants';
import { Subscription } from 'rxjs';
import { Color, Tool } from '../../../../shared/entities/draw.entity';

@Component({
  selector: 'app-white-board',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  @Input() selectedColor: Color = { name: 'black', value: 'black' };
  @Input() selectedTool: Tool = { name: 'pencil', value: 3, icon: 'assets/icons/pencil.svg' };
  isDrawing: boolean = false;
  // selectedColor: string = 'black';
  roomId: string = '';
  whiteboardData!: Whiteboard;
  canvasContext!: CanvasRenderingContext2D;
  whiteboardDataSubscription!: Subscription;
  websocketOnEventSubscription!: Subscription;
  roomIdSubscription!: Subscription;

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
        ctx.strokeStyle = this.selectedTool.color?.value || this.selectedColor.value;
        ctx.lineWidth = this.selectedTool.value;
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
          this.webSocketService.send(Constants.DRAW_EVENT, { roomId: this.roomId, toDataUrl });
        }, 500);
      }

    }
  }

  // enableErase(): void {
  //   this.selectedColor = 'white';

  // }
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
    this.websocketOnEventSubscription = this.webSocketService.onEvent(Constants.DRAW_EVENT).subscribe((data: any) => {
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
    this.whiteboardDataSubscription = this.whiteboardService.whiteboardData.subscribe((data: Whiteboard) => {
      this.whiteboardData = data;
      console.log("Subscribed_data", data);
      if (data.toDataUrl && this.canvasContext) {
        console.log("Subscribed_dataIN", data);

        const img = new Image();
        img.onload = () => {
          console.log("Subscribed_dataINOnimg", data);
          this.canvasContext.drawImage(img, 0, 0);
        };
        img.src = data.toDataUrl;
      }
    })
  }
  async ngOnInit() {
    // connect to websocket
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      this.canvasContext = ctx;
      this.connectToWebSocket();
      this.subscribeWhiteboardData();


      // subscribe to the room
      this.roomIdSubscription = this.route.params.subscribe(params => {
        this.roomId = params['roomId'];
        this.joinDrawRoom(this.roomId);
        console.log("roomId", params['roomId']);

      });
    }

    // fetch latest canvas data



  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
    this.whiteboardDataSubscription.unsubscribe();
    this.websocketOnEventSubscription.unsubscribe();
    this.roomIdSubscription.unsubscribe();
  }
}
