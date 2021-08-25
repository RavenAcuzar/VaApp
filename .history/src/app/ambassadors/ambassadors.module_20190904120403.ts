import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AmbassadorsPage } from './ambassadors.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmbassadorsPage]
})
export class AmbassadorsPageModule {}
