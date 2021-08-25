import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AmbassadorProfilePage } from './ambassador-profile.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmbassadorProfilePage]
})
export class AmbassadorProfilePageModule {}
