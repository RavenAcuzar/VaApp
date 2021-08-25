import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TravelSendRequestPage } from './travel-send-request.page';

const routes: Routes = [
  {
    path: '',
    component: TravelSendRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TravelSendRequestPage]
})
export class TravelSendRequestPageModule {}
