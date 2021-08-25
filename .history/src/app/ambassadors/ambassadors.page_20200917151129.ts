import { Component, OnInit } from '@angular/core';

import { Ambassador } from '../../models/ambassador.model';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SqliteService } from '../services/sqlite.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ambassadors',
  templateUrl: './ambassadors.page.html',
  styleUrls: ['./ambassadors.page.scss'],
})
export class AmbassadorsPage implements OnInit {


  ambassadors: Array<Ambassador> = new Array<Ambassador>();
  load: any;

  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    private loadCtrl: LoadingController,
    private sqlSvc: SqliteService,
    private apiSvc: ApiService
  ) { }

  ngOnInit() {
    this.retrieveData();
  }

  async retrieveData() {
    const loader = await this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    });
    await loader.present();
    let holder = await this.sqlSvc.getAmbassadorsData();
    console.log(holder)
    if (holder.length == 0) {
      //load from api then save to sqlite
      this.ambassadors = await this.apiSvc.getAllAmbassadors();
      await loader.dismiss();
    } else {
      // for (let i = 0; i < holder.length; i++) {
      //   let item = holder.item(i);
      //   // do something with it

      //   this.ambassadors.push(item);
      // }
      this.ambassadors = holder;
      // console.log(this.ambassadors)
      await loader.dismiss();
    }
  }


}
