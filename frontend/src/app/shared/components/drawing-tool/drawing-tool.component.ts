import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Color, Tool } from '../../entities/draw.entity';

@Component({
  selector: 'app-drawing-tool',
  templateUrl: './drawing-tool.component.html',
  styleUrls: ['./drawing-tool.component.scss']
})
export class DrawingToolComponent {
  @Output() changeColorEvent = new EventEmitter();
  @Output() changeToolEvent = new EventEmitter();
  
  @Input() selectedColor:Color = {name: 'black', value: 'black'};
  @Input() selectedTool: Tool = {name: 'pencil', value: 3, icon: 'assets/icons/pencil.svg'};
  @Input() selectedEraser: boolean = false;
  @Input() colors: Array<Color> = [];
  @Input() tools: Array<Tool> = [];

  
  changeColor(color: Color){
    this.selectedColor = color;
    this.changeColorEvent.emit(color);
  }
  
  changeTool(tool: Tool){
    this.selectedEraser = false;
    this.selectedTool = tool;
    this.changeToolEvent.emit(tool);
  }

  // selectEraser(){
  //   this.selectedColor = 'white';
  //   this.selectedTool = 11;
  //   this.selectedEraser = true;
  //   this.changeColorEvent.emit('white');
  //   this.changeToolEvent.emit(10);
  // }
  constructor() { }

}
