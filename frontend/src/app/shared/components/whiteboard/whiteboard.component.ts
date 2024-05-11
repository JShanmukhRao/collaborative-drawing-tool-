import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-white-board',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  isDrawing:boolean = false;
  selectedColor: string = 'black';
  private timeoutId: any;

  constructor(
    private webSocketService: WebSocketService
  ){}
  onMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    const ctx = this.canvas.nativeElement.getContext('2d');
    if(ctx){
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
    }
    console.log('mouse down', event, this.isDrawing);

  }
  onMouseMove(event: MouseEvent): void {
    if(this.isDrawing){
      const ctx = this.canvas.nativeElement.getContext('2d');
      if(ctx){
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
          const dataUrl = this.canvas.nativeElement.toDataURL("image/png");
          console.log('mouse move', dataUrl);
          this.webSocketService.send('draw', dataUrl);
        }, 500);
      }
     
    }
  }

  enableErase():void{
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
  async ngOnInit(){
    const parent = this.canvas.nativeElement.parentElement;
    const ctx = this.canvas.nativeElement.getContext('2d');

    this.webSocketService.connect('ws://localhost:3000');
    this.webSocketService.onEvent('draw').subscribe((dataUrl:any) => {
  
      console.log("WEBSOCKET_DATA", dataUrl)
     
      const img = new Image();
      img.onload = () => {       
        if(ctx)  ctx.drawImage(img, 0, 0);
      };
      img.src = dataUrl;

      // When the image loads, draw it onto the canvas
      
    
    });
    // connect to websocket

   if(parent){
     this.canvas.nativeElement.width = parent.clientWidth;
     this.canvas.nativeElement.height = parent.clientHeight;

   }
   
  
  }

  ngOnDestroy():void{
    this.webSocketService.disconnect();
  }
}
