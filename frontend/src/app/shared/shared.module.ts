import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';

@NgModule({

  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  exports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule, WhiteboardComponent],
  declarations: [
    WhiteboardComponent
  ]
})
export class SharedModule { }