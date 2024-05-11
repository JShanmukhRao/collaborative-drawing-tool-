import { Component } from '@angular/core';
import { WhiteboardService } from 'src/app/shared/services/whiteboard.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(private whiteboardService: WhiteboardService){}

  async createWhiteboard() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const timestamp = new Date().getTime();
    const roomId = randomNumber.toString() + timestamp.toString();
    await this.whiteboardService.createWhiteboard({
      roomId,
      name: 'My Whiteboard',
      description: 'This is a test whiteboard'
    })
  }
}
