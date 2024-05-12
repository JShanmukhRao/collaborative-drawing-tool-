import { Component, OnDestroy, OnInit } from '@angular/core';
import { Color, Tool } from 'src/app/shared/entities/draw.entity';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit, OnDestroy{

  selectedColor: Color = { name: 'black', value: 'black' }
  selectedTool: Tool = { name: 'pencil', value: 3, icon: 'assets/icons/pencil.svg' };
  colors = [
  {
    name: 'black',
    value: 'black'
  },
  {
    name: 'red',
    value: 'red'
  },
  {
    name: 'blue',
    value: 'blue'
  },
  {
    name: 'green',
    value: 'green'
  },
  {
    name: 'yellow',
    value: 'yellow'
  },
  {
    name: 'purple',
    value: 'purple'
  },
  {
    name: 'orange',
    value: 'orange'
  },
  {
    name: 'brown',
    value: 'brown'
  },
  {
    name: 'pink',
    value: 'pink'
  },
  {
    name: 'gray',
    value: 'gray'
  },
  {
    name: 'white',
    value: 'white'
  }
  ]

  tools = [
    {
      name: 'pencil',
      value: 3,
      icon: 'assets/icons/pencil.svg'
    },
    {
      name: 'marker',
      value: 5,
      icon: 'assets/icons/marker.svg'
    },
    {
      name: 'highlighter',
      value: 10,
      icon: 'assets/icons/highlighter.svg'
    },
    {
      name: 'Eraser',
      value: 20,
      icon: 'assets/icons/eraser.svg',
      color: {
        name: 'white',
        value: 'white'
      }
    }
  ]
  constructor() {}



  changeColor($event:Color){
    this.selectedColor = $event;
    console.log($event);
  }

  changeTool($event: Tool) {
    this.selectedTool = $event;
    console.log($event);
  }
  ngOnInit() {
    // connect to web socket
  }

  ngOnDestroy() {

    // disconnect to web socket
  }
}
