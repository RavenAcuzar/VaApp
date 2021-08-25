import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditVaPage } from './edit-va.page';
import { FooterTabModule } from '../footer-tab/footer-tab.module'

const routes: Routes = [
  {
    path: '',
    component: EditVaPage
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
  declarations: [EditVaPage]
})
export class EditVaPageModule {}
