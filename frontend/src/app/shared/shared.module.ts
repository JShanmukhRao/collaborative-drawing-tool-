import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WhiteboardComponent } from '../modules/draw/components/whiteboard/whiteboard.component';
import { HeaderComponent } from './components/header/header.component';
import { DrawingToolComponent } from '../modules/draw/components/drawing-tool/drawing-tool.component';
import { AuthGuard } from "./guard/auth.guard";

@NgModule({

  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  exports: [DrawingToolComponent, HeaderComponent, ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule, WhiteboardComponent],
  declarations: [
    WhiteboardComponent,
    HeaderComponent,
    DrawingToolComponent,
  ],
  providers: [AuthGuard]
})
export class SharedModule { }