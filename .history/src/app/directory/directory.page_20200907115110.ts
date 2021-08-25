import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { Platform, NavController, LoadingController, Events, AlertController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';

import { Corporate } from '../../models/corporate.model'
@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  corporate = Array<Corporate>();
  type: 'GBD';
  viewTable = [];
  constructor(private sqlSvc: SqliteService) { }

  ngOnInit() {
    this.sqlSvc.getCorporatesData().then(result => {
      this.corporate = result
      this.viewTable = this.corporate.filter(function (row) {
        row.Department == 'GBD'
      })
    })
  }

  changeView() {
    let department = this.type;
    this.viewTable = this.corporate.filter(function (row) {
      row.Department == department
    })
  }
}
