import { Component, OnInit } from '@angular/core';
import { Article } from '../../../types/article';

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.scss']
})
export class PublishedComponent implements OnInit {
  published: Article[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
