import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightsComponent } from './highlights.component';



@NgModule({
  declarations: [
    HighlightsComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightsComponent,
  ]
})
export class HighlightsModule { }
