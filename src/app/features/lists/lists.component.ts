import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  currentLink: string;

  constructor(private router: Router) {
    this.currentLink = router.url
  }

  ngOnInit(): void {
  }

}
