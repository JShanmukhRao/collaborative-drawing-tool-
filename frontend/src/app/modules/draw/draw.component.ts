import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit, OnDestroy{
  constructor() {}

  ngOnInit() {
    // connect to web socket
  }

  ngOnDestroy() {

    // disconnect to web socket
  }
}
