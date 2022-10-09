import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoadingOff, setLoadingOn } from '../../state/main/main.actions';
import { selectLoading } from '../../state/main/main.selectors';
import { UserService } from '../../services/user.service';
import { setUserInfo } from '../../state/user/user.actions';
import { filter, pairwise } from 'rxjs';
import { any } from 'joi';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isLoading!: boolean;
  currentUrl!: string;

  constructor(
    private auth: AuthService,
    private notification: NotificationService,
    private router: Router,
    private store: Store,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.store.select(selectLoading)
      .subscribe(main => {
        this.isLoading = main.isLoading;
      })
  }

  ngOnInit() {
    this.store.dispatch(setLoadingOn());

    if (!localStorage.getItem('jwt_token')) {
      this.getTokenFromServerSide();
    }

    setTimeout(() => this.getUserInfo(), 1000)
  }


  private getTokenFromServerSide() {
    this.store.dispatch(setLoadingOn());
    this.auth.getToken()
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            localStorage.setItem('jwt_token', res.jwt_token);
            this.store.dispatch(setLoadingOff());
          }
        },
        error: () => {
          this.store.dispatch(setLoadingOff());
        }
      })
  }

  private getUserInfo() {
    this.userService.getMyInfo()
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.store.dispatch(setUserInfo({ user: res.user }));
            this.store.dispatch(setLoadingOff());
          }
        },
        error: (err) => {
          this.store.dispatch(setLoadingOff());
        }
      })
  }
}
