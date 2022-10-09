import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  saved = [
    { title: 'Reading List', lists: [] }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
