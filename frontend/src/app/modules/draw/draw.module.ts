import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawComponent } from './draw.component';
import { DrawRoutingModule } from './draw-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DrawComponent
  ],
  imports: [
    CommonModule,
    DrawRoutingModule,
    SharedModule
  ]
})
export class DrawModule { }
