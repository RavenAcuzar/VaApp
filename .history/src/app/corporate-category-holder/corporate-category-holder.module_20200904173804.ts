import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CorporateCategoryHolderPage } from './corporate-category-holder.page';
import { FooterTabModule } from '../footer-tab/footer-tab.module'

const routes: Routes = [
  {
    path: '',
    component: CorporateCategoryHolderPage
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
  declarations: [CorporateCategoryHolderPage]
})
export class CorporateCategoryHolderPageModule {}
