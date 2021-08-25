import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Http } from '@angular/http';

import { Ambassador } from '../../models/ambassador.model';
import { Defaults } from '../objects';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-contact-profiles',
  templateUrl: './contact-profiles.page.html',
  styleUrls: ['./contact-profiles.page.scss'],
})
export class ContactProfilesPage implements OnInit {

  load: any;
  ambassadors: Array<Ambassador>;
  Defaults_: Defaults = new Defaults();


  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    private http: Http,
    private loadCtrl: LoadingController) {
    this.ambassadors = new Array<Ambassador>();



    this.retrieveData();
  }

  ngOnInit() {
  }

  retrieveData() {
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present();
      this.load = loader;
    });

    // this.sqlite.create({
    //   name: "vapp.db",
    //   location: "default"
    // }).then((db: SQLiteObject) => {
    //   db.executeSql("select * from Ambassador", [])
    //     .then
    // this.http.get('http://localhost:8080/gbd').subscribe(res => {
    // 	console.log(res.json())
    // })
    this.http.get('http://localhost:8080/ambassadors').subscribe(res => {
      console.log(res.json())
      var val = res.json();
      for (let i = 0; i < val.rows.length; i++) {
        let holder = new Ambassador();
        holder.fromJson(val.rows.item(i));

        this.ambassadors.push(holder);
      }

      this.load.dismiss();
    }, err => {
      console.log(err)
      this.load.dismiss();
    })
    // .catch(err => {
    //   console.log(err);
    //   this.load.dismiss();
    // });
  }

  viewContact(content: Ambassador) {

    let navParams: NavigationExtras = {
      state: {
        data: content
      }
    }

    this.navCtrl.navigateForward(['/ambassador-contact'], navParams);
  }

}
