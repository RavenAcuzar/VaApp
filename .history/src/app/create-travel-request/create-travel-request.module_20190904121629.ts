import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateTravelRequestPage } from './create-travel-request.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTravelRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateTravelRequestPage]
})
export class CreateTravelRequestPageModule {}
