import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-white-board',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  isDrawing:boolean = false;
  selectedColor: string = 'black';

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
    console.log('mouse move', this.selectedColor, this.isDrawing);
    if(this.isDrawing){
      const ctx = this.canvas.nativeElement.getContext('2d');
      if(ctx){
        // ctx.beginPath();
        ctx.strokeStyle = this.selectedColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
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
  ngOnInit():void{

    // connect to websocket
    const parent = this.canvas.nativeElement.parentElement;

   if(parent){
     this.canvas.nativeElement.width = parent.clientWidth;
     this.canvas.nativeElement.height = parent.clientHeight;

   }
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx !== null) {
      ctx.font = '30px Arial';
      ctx.fillStyle = 'black';

      // Draw the text
      ctx.fillText('Hello, world!', 10, 50);

      // Draw a rectangle
      ctx.fillRect(75, 75, 50, 50);

      // Draw a line
      ctx.beginPath();
      ctx.moveTo(100, 150);
      ctx.lineTo(200, 150);
      ctx.stroke();

      // Draw a circle
      ctx.beginPath();
      ctx.arc(100, 75, 50, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      // Handle the case where ctx is null
      console.error('2D context not supported');
    }
  }

}
