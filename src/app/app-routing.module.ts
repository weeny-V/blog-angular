import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './features/article-list/article-list.component';
import { LoginComponent } from './core/login/login.component';
import { MainComponent } from './core/main/main.component';
import { SignupComponent } from './core/signup/signup.component';
import { ListsComponent } from './features/lists/lists.component';
import { HighlightsComponent } from './features/lists/highlights/highlights.component';
import { SavedComponent } from './features/lists/saved/saved.component';
import { WriteComponent } from './features/write/write.component';
import { StoriesComponent } from './features/stories/stories.component';
import { DraftsComponent } from './features/stories/drafts/drafts.component';
import { PublishedComponent } from './features/stories/published/published.component';
import { ResponsesComponent } from './features/stories/responses/responses.component';
import { PasswordComponent } from './core/password/password.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { ProfileComponent } from './features/profile/profile.component';
import { HomeComponent } from './features/profile/home/home.component';
import { AboutComponent } from './features/profile/about/about.component';

const routes: Routes = [
  { path: 'login', canActivate: [NotAuthGuard], component: LoginComponent },
  { path: 'sign-up', canActivate: [NotAuthGuard], component: SignupComponent },
  { path: 'password', canActivate: [NotAuthGuard], component: PasswordComponent },
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'articles' },
      { path: 'articles', canActivate: [AuthGuard], component: ArticleListComponent },
      {
        path: 'lists',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ListsComponent,
        children: [
          { path: '', component: SavedComponent },
        ]
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ListsComponent,
        children: [
          { path: 'highlights', component: HighlightsComponent },
        ]
      },
      { path: 'write', canActivate: [AuthGuard], component: WriteComponent },
      {
        path: 'stories',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: StoriesComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'drafts' },
          { path: 'drafts', component: DraftsComponent },
          { path: 'public', component: PublishedComponent },
          { path: 'responses', component: ResponsesComponent },
        ]
      },
      {
        path: ':profileID', canActivate:[AuthGuard], canActivateChild:[AuthGuard], component: ProfileComponent, children: [
          { path: '', title: 'Home', component: HomeComponent },
          { path: 'about', title: 'About',  component: AboutComponent },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
