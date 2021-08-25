import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPage } from './change-password.page';
import { FooterTabModule } from '../footer-tab/footer-tab.module'

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FooterTabModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
