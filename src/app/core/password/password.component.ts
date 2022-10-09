import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../state/main/main.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { URLParams } from '../../types/main';
import { NotificationService } from '../../services/notification.service';
import { setLoadingOff, setLoadingOn } from '../../state/main/main.actions';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @ViewChild('password') private password!: ElementRef;
  @ViewChild('confirm') private confirm!: ElementRef;

  passwordForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl(''),
  })
  showPassword: boolean = false;
  showConfirm: boolean = false;
  isLoading = false;
  params!: URLParams;

  constructor(
    public auth: AuthService,
    private store: Store,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectLoading)
      .subscribe(main => {
        this.isLoading = main.isLoading;
      });
    this.activeRouter.queryParams
      .subscribe(params => {
        this.params = {
          id: params['id'],
          name: params['name'],
          surname: params['surname'],
          email: params['email'],
          method: params['method'],
        };
      })
  }

  showFieldText(field: string) {
    if (field === 'password') {
      this.showPassword = true;
      this.password.nativeElement.type = 'text';
    } else if (field === 'confirm') {
      this.showConfirm = true;
      this.confirm.nativeElement.type = 'text';
    }
  }

  hideFieldText(field: string) {
    if (field === 'password') {
      this.showPassword = false;
      this.password.nativeElement.type = 'password';
    } else if (field === 'confirm') {
      this.showConfirm = false;
      this.confirm.nativeElement.type = 'password';
    }
  }

  setPassword(): void {
    const { name, surname, email, method } = this.params;
    const { password, confirm } = this.passwordForm.value;

    if (password !== confirm ) {
      this.notification.openSnackBar('Passwords do not match');
      return undefined;
    }

    this.store.dispatch(setLoadingOn());
    this.auth.register(name, surname, email, password!, method).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
        this.store.dispatch(setLoadingOff());
      },
      error: () => {
        this.notification.openSnackBar('Something went wrong. Try again');
        this.store.dispatch(setLoadingOff());
      }
    });
  }
}
