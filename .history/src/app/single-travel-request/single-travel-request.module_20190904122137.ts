import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SingleTravelRequestPage } from './single-travel-request.page';

const routes: Routes = [
  {
    path: '',
    component: SingleTravelRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SingleTravelRequestPage]
})
export class SingleTravelRequestPageModule {}
