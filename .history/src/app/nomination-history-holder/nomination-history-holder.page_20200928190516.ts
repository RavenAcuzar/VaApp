import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import { Defaults } from '../objects';
import { Nominee } from '../../models/nominee.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-nomination-history-holder',
  templateUrl: './nomination-history-holder.page.html',
  styleUrls: ['./nomination-history-holder.page.scss'],
})
export class NominationHistoryHolderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
