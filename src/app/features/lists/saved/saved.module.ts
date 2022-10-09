import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedComponent } from './saved.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SavedComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    SavedComponent,
  ]
})
export class SavedModule { }
