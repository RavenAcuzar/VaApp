import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AmbassadorPartnersPage } from './ambassador-partners.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorPartnersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmbassadorPartnersPage]
})
export class AmbassadorPartnersPageModule {}
