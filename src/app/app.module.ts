import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticlesModule } from './features/article-list/articles.module';
import { ListsModule } from './features/lists/lists.module';
import { SidebarModule } from './features/sidebar/sidebar.module';
import { StoriesModule } from './features/stories/stories.module';
import { WriteModule } from './features/write/write.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state';
import { MainModule } from './state/main/main.module';
import { UserModule } from './state/user/user.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { ProfileComponent } from './features/profile/profile.component';
import { HomeComponent } from './features/profile/home/home.component';
import { AboutComponent } from './features/profile/about/about.component';
import { MatIconModule } from '@angular/material/icon';
import { TextMenuComponent } from './shared/text-menu/text-menu.component';
import { RequestOptionsInterceptor } from './interceptors/request-options.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    AboutComponent,
    TextMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ArticlesModule,
    ListsModule,
    SidebarModule,
    StoriesModule,
    WriteModule,
    MatSnackBarModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    MainModule,
    UserModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatIconModule
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestOptionsInterceptor,
      multi: true,
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
