import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ToolsLandingPage } from './tools-landing.page';

const routes: Routes = [
  {
    path: '',
    component: ToolsLandingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ToolsLandingPage]
})
export class ToolsLandingPageModule {}
