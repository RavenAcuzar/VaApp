import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NominationHistoryHolderPage } from './nomination-history-holder.page';

const routes: Routes = [
  {
    path: '',
    component: NominationHistoryHolderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NominationHistoryHolderPage]
})
export class NominationHistoryHolderPageModule {}
