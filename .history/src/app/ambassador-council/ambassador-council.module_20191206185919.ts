import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AmbassadorCouncilPage } from './ambassador-council.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorCouncilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmbassadorCouncilPage]
})
export class AmbassadorCouncilPageModule {}
