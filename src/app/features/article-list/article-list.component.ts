import { Component, OnInit } from '@angular/core';
import { Article } from '../../types/article';
import { articles as data_articles } from '../../data';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor() { }

  ngOnInit(): void {
    this.articles = data_articles;
  }

}
