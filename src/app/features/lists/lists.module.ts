import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedModule } from './saved/saved.module';
import { HighlightsModule } from './highlights/highlights.module';
import { ListsComponent } from './lists.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    ListsComponent,
  ],
  imports: [
    CommonModule,
    SavedModule,
    HighlightsModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
  ],
  exports: [
    ListsComponent,
    SavedModule,
    HighlightsModule,
  ]
})
export class ListsModule { }
