import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { mainFeature } from './main.reducer';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(mainFeature),
  ]
})
export class MainModule { }
