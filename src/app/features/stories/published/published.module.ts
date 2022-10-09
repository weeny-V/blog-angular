import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishedComponent } from './published.component';
import { ArticleModule } from '../../../shared/article/article.module';

@NgModule({
  declarations: [
    PublishedComponent,
  ],
  imports: [
    CommonModule,
    ArticleModule,
  ],
  exports: [
    PublishedComponent,
    ArticleModule,
  ]
})
export class PublishedModule { }
