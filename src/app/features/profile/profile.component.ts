import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserEmail, getUserFullName } from '../../state/user/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  fullName!: string;
  email!: string;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.select(getUserFullName)
      .subscribe(name => {
        this.fullName = name;
      })
    this.store.select(getUserEmail)
      .subscribe(email => {
        this.email = email;
      })
  }

}
