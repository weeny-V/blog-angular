import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../types/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
