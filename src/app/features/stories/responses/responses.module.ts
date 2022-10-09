import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsesComponent } from './responses.component';

@NgModule({
  declarations: [
    ResponsesComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ResponsesComponent,
  ]
})
export class ResponsesModule { }
