import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../state/main/main.selectors';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { setLoadingOff, setLoadingOn } from '../../state/main/main.actions';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  isLoading: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    public auth: AuthService,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.store.select(selectLoading).subscribe(main => {
      this.isLoading = main.isLoading;
    })
  }

  googleAuth() {
    window.location.href = 'http://localhost:3000/login/google';
  }

  facebookAuth() {
    window.location.href = 'http://localhost:3000/facebook/login';
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(setLoadingOn());
    this.auth.login(email!, password!).subscribe({
      next: (res) => {
        if (res.status === 200) {
          localStorage.setItem('jwt_token', res.jwt_token);
          this.router.navigate(['/'])
          this.store.dispatch(setLoadingOff());
        }
      },
      error: () => {
        this.notification.openSnackBar('Your email or password is wrong. Try again.')
        this.store.dispatch(setLoadingOff());
      }
    })
  }
}
