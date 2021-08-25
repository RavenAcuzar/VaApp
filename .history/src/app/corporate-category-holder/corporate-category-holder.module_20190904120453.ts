import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CorporateCategoryHolderPage } from './corporate-category-holder.page';

const routes: Routes = [
  {
    path: '',
    component: CorporateCategoryHolderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CorporateCategoryHolderPage]
})
export class CorporateCategoryHolderPageModule {}
