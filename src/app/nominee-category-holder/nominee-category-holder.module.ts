import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NomineeCategoryHolderPage } from './nominee-category-holder.page';
import { FooterTabModule } from '../footer-tab/footer-tab.module'

const routes: Routes = [
  {
    path: '',
    component: NomineeCategoryHolderPage
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
  declarations: [NomineeCategoryHolderPage]
})
export class NomineeCategoryHolderPageModule {}
