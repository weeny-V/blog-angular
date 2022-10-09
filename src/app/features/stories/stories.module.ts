import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishedModule } from './published/published.module';
import { DraftsModule } from './drafts/drafts.module';
import { ResponsesModule } from './responses/responses.module';
import { StoriesComponent } from './stories.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@NgModule( {
  declarations: [
    StoriesComponent,
  ],
  imports: [
    CommonModule,
    PublishedModule,
    DraftsModule,
    ResponsesModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
  ],
  exports: [
    StoriesComponent,
    PublishedModule,
    DraftsModule,
    ResponsesModule,
  ]
} )
export class StoriesModule {
}
