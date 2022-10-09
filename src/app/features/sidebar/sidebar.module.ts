import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
  ],
  exports: [
    SidebarComponent,
  ]
})
export class SidebarModule { }
