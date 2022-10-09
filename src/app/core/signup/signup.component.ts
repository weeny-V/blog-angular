import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { selectLoading } from '../../state/main/main.selectors';
import { Store } from '@ngrx/store';
import { setLoadingOff, setLoadingOn } from '../../state/main/main.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('password')private password!: ElementRef;
  @ViewChild('confirm')private confirm!: ElementRef;
  @ViewChild('submit')private submitBtn!: ElementRef;

  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl(''),
  })
  showPassword: boolean = false;
  showConfirm: boolean = false;
  isLoading!: boolean;
  method: string = 'common';
  facebookID!: string;

  constructor(
    private notification: NotificationService,
    public auth: AuthService,
    private router: Router,
    private store: Store,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.select(selectLoading).subscribe(main => {
      this.isLoading = main.isLoading;
    })

    this.activeRouter.queryParams
      .subscribe(params => {
        if (params) {
          this.method = params['method'] !== 'undefined' && params['method'];
          this.facebookID = params['id'] !== 'undefined' && params['id'];
          this.registerForm.patchValue({
            name: params['name'],
            surname: params['surname'],
            email: params['email'] !== 'undefined' ? params['email'] : '',
          })
        }
      })
  }

  showFieldText(field: string) {
    if(field === 'password') {
      this.showPassword = true;
      this.password.nativeElement.type = 'text';
    } else if (field === 'confirm') {
      this.showConfirm = true;
      this.confirm.nativeElement.type = 'text';
    }
  }

  hideFieldText(field: string) {
    if(field === 'password') {
      this.showPassword = false;
      this.password.nativeElement.type = 'password';
    } else if (field === 'confirm') {
      this.showConfirm = false;
      this.confirm.nativeElement.type = 'password';
    }
  }

  google() {
    window.location.href = 'http://localhost:3000/signup/google';
  }

  facebook() {
    window.location.href = 'http://localhost:3000/facebook/signup';
  }

  twitter() {
    window.location.href = 'http://localhost:3000/twitter/signup';
  }

  registration() {
    const { name, surname, email, password, confirm } = this.registerForm.value;

    if (password !== confirm) {
      this.notification.openSnackBar('Passwords don\'t match!!!');
    } else {
      this.store.dispatch(setLoadingOn())
      this.auth.register(name!, surname!, email!, password!, this.method, this.facebookID).subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.notification.openSnackBar(res.message);
            this.router.navigate(['/login']);
            this.store.dispatch(setLoadingOff());
          }
        },
        error: (err) => {
          this.notification.openSnackBar(err.error.message);
          this.store.dispatch(setLoadingOff());
        }
      })
    }
  }
}
