import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { Defaults } from '../objects';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Corporate } from '../../models/corporate.model';
import { Http } from '@angular/http';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.page.html',
  styleUrls: ['./corporate.page.scss'],
})
export class CorporatePage implements OnInit {
  corporate: Array<Corporate> = new Array<Corporate>();
  categories: Array<{ name: string, display: string }>;
  load: any;
  Defaults_: Defaults = new Defaults();


  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    private http: Http,
    private loadCtrl: LoadingController,
    private aroute: ActivatedRoute,
    private router: Router) {


    this.retrieveData();
    this.categories = [
      { name: "ACEO", display: "ACEO" },
      { name: "ED", display: "ED" },
      { name: "CMRO", display: "CMRO" },
      { name: "COO", display: "CSAS" },
      { name: "NSE", display: "GLAD" },
      { name: "GBD", display: "GBD" }
    ];
  }

  ngOnInit() {
  }

  retrieveData() {
    // this.loadCtrl.create({
    //   spinner: "crescent",
    //   message: "Loading..."
    // }).then(loader => {
    //   loader.present()
    //   this.load = loader;
    // });

    // this.sqlite.create({
    //   name: "vapp.db",
    //   location: "default"
    // }).then((db: SQLiteObject) => {
    //   db.executeSql("select * from Corporate", [])
    //     .then(val => {
    //       for (let i = 0; i < val.rows.length; i++) {
    //         let holder: Corporate = new Corporate();
    //         holder.fromJson(val.rows.item(i));

    //         this.corporate.push(holder);
    //       }

    //       this.load.dismiss();
    //     });
    // }).catch(err => {
    //   console.log(err);
    //   this.load.dismiss()
    // });

    let loadingPopup: any;
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loadingPopup = loader;
      loader.present();

      this.http.get('http://localhost:8080/corporate').subscribe(res => {
        console.log(res.json())
        var val = res.json();
        for (let i = 0; i < val.length; i++) {
          let holder: Corporate = new Corporate();

          // holder.fromJson(val[i]);
          holder = val[i]
          this.corporate.push(holder);
        }

        loadingPopup.dismiss();
      }, err => {
        console.log(err)
        loadingPopup.dismiss();
      })
    });

  }

  categoryHandler(cat: { name: string, display: string }) {
    let arr: Array<Corporate> = this.corporate.filter(elem => elem.Department == cat.name);

    let navParams: NavigationExtras = {
      state: {
        data: this.corporate,
        category: cat
      }
    }

    if (arr.length > 1) {
      this.navCtrl.navigateForward(['/corporate-category-holder'], navParams);
    }

    else {
      this.corporateProfile(arr[0]);
    }
  }

  corporateProfile(content: Corporate) {
    let navParams: NavigationExtras = {
      state: {
        data: content
      }
    }

    this.navCtrl.navigateForward(['/corporate-profile'], navParams);
  }

}
