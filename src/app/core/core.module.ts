import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';
import { SidebarModule } from '../features/sidebar/sidebar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { LoaderModule } from '../shared/loader/loader.module';
import { PasswordComponent } from './password/password.component';

@NgModule( {
  declarations: [
    FooterComponent,
    NavBarComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    PasswordComponent,
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        SidebarModule,
        RouterOutlet,
        RouterLink,
        ReactiveFormsModule,
        MatInputModule,
        SpinnerModule,
        LoaderModule,
    ],
  exports: [
    FooterComponent,
    NavBarComponent,
    SpinnerModule,
  ],
} )
export class CoreModule {
}
