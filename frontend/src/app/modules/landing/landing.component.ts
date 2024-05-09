import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  canvasOptions =[
    {
      label: 'Create new canvas',

    },
    {
      label: 'Open existing canvas',
    }
  ]
  showOptions:boolean = false;


  toggleOptions(){
    this.showOptions = !this.showOptions;
  }
}
