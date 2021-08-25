import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPage } from './forgot-password.page';
import { FooterTabModule } from '../footer-tab/footer-tab.module'

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FooterTabModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
