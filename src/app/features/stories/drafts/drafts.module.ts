import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts.component';



@NgModule({
  declarations: [
    DraftsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DraftsComponent,
  ]
})
export class DraftsModule { }
