import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SafePipe, SingleVideoPage } from './single-video.page';
import { FooterTabModule } from '../footer-tab/footer-tab.module'

const routes: Routes = [
  {
    path: '',
    component: SingleVideoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FooterTabModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SingleVideoPage, SafePipe]
})
export class SingleVideoPageModule {}
