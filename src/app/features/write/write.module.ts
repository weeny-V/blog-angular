import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteComponent } from './write.component';
import { MatIconModule } from '@angular/material/icon';
import { CoordinatesDirective } from '../../directives/coordinates.directive';
import { TypingDirective } from '../../directives/typing.directive';
import { NewParagraphDirective } from '../../directives/new-paragraph.directive';

@NgModule({
  declarations: [
    WriteComponent,
    CoordinatesDirective,
    TypingDirective,
    NewParagraphDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    WriteComponent,
    CoordinatesDirective,
    TypingDirective,
    NewParagraphDirective,
  ],
})
export class WriteModule {
}
