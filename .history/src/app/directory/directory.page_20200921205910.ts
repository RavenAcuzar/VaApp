import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { Platform, NavController, LoadingController, Events, AlertController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SqliteService } from '../services/sqlite.service';
import { HTTP } from '@ionic-native/http/ngx'
import { DomSanitizer } from '@angular/platform-browser';
import { Defaults } from '../objects';

import { Corporate } from '../../models/corporate.model'
@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  corporate: Array<Corporate> = new Array<Corporate>();
  Defaults_: Defaults = new Defaults();
  topTable: any[] = [];
  type: 'GBD';
  viewTable = [];
  constructor(private sqlSvc: SqliteService,
    private apiSvc: ApiService,
    private loadCtrl: LoadingController, private nativeHttp: HTTP,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.retrieveData().then(result => {
      console.log(this.corporate)
      // this.corporate.forEach(item => {
      //   item.Image = item.Image.replace('http://the-v.net', 'http://site.the-v.net')

      //   let reader = new FileReader();
      //   this.nativeHttp.sendRequest(item.Image, { method: 'get', responseType: 'blob', data: {}, headers: {} })
      //     .then(result => {
      //       let data;
      //       reader.readAsDataURL(result.data);
      //       reader.onloadend = () => {
      //         data = reader.result
      //         // data = "data:image/jpeg;base64," + data;
      //         item.Image = data
      //         item['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(item.Image)

      //       }
      //     }, error => {
      //       console.log(error)
      //     })
      // })
      this.viewTable = this.corporate.filter(function (row) {
        return row.Department == 'GBD'
      })
      console.log(this.viewTable)
    });

    // this.sqlSvc.getCorporatesData().then(result => {
    //   this.corporate = result
    //   console.log(result)
    //   this.viewTable = this.corporate.filter(function (row) {
    //     row.Department == 'GBD'
    //   })
    //   console.log(this.viewTable)
    // })
  }

  async retrieveData() {
    const loader = await this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    });
    await loader.present();
    let holder = await this.sqlSvc.getCorporatesData();
    // console.log(holder)
    // if (holder.length == 0) {
    //   //load from api then save to sqlite
    //   this.corporate = await this.apiSvc.getAllCorp();
    //   await loader.dismiss();
    // } else {
    for (let i = 0; i < holder.length; i++) {
      let item = holder.item(i);
      // do something with it
      if (item.email == "david.sharma@the-v.net" ||
        item.email == "venujohl@the-v.net" ||
        item.email == "srikanth@the-v.net") {
        this.topTable.push(item)
      }
      this.corporate.push(item);
      // }
      // this.corporate = holder;
    }

    let ambHolder = await this.sqlSvc.getAmbassadorByEmail('devjohl@hotmail.com');
    this.topTable.push(ambHolder.item(0))
    console.log(this.topTable)
    await loader.dismiss();

  }

  changeView() {
    let department = this.type;
    console.log(department)
    this.viewTable = this.corporate.filter(function (row) {
      return row.Department == department
    })
  }
}
