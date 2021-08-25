import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AmbassadorAssociatePage } from './ambassador-associate.page';

const routes: Routes = [
  {
    path: '',
    component: AmbassadorAssociatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmbassadorAssociatePage]
})
export class AmbassadorAssociatePageModule {}
