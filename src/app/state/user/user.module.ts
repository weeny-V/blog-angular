import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './user.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(userFeature),
  ]
})
export class UserModule { }
