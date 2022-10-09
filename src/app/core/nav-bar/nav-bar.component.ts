import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../state/main/main.selectors';
import { setLoadingOff, setLoadingOn } from '../../state/main/main.actions';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { getUserEmail, getUserFullName } from '../../state/user/user.selectors';
import { setUserInfo } from '../../state/user/user.actions';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  name!: string;
  isLoading!: boolean;
  email!: string;

  constructor(
    private auth: AuthService,
    private store: Store,
    private router: Router,
    private notification: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectLoading)
      .subscribe(main => {
          this.isLoading = main.isLoading;
        }
      )

    this.store.select(getUserFullName)
      .subscribe(name => {
        this.name = name;
      })

    this.store.select(getUserEmail)
      .subscribe(email => {
        this.email = email;
      })
  }

  logout() {
    this.store.dispatch(setLoadingOn());
    this.auth.logout()
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            localStorage.removeItem('jwt_token');
            this.router.navigate(['/login']);
            this.store.dispatch(setLoadingOff());
          }
        },
        error: () => {
          this.notification.openSnackBar('Something went wrong');
          this.store.dispatch(setLoadingOff());
        }
      })
  }

}
