import { Component, OnInit } from '@angular/core';

import { Ambassador } from '../../models/ambassador.model';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SqliteService } from '../services/sqlite.service';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

  // searchbar = document.querySelector('ion-searchbar')
  items: Array<Ambassador> = new Array<Ambassador>();
  displayItems: Array<Ambassador> = new Array<Ambassador>();

  inList: boolean = false;
  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    private loadCtrl: LoadingController,
    private sqlSvc: SqliteService,
    private apiSvc: ApiService
  ) {

    // this.searchbar.addEventListener('ionInput', this.handleInput);
    this.initializeItems()
  }

  ngOnInit() {
  }

  handleInput(event) {
    // this.initializeItems();
    this.displayItems = this.items;
    let holder = this.items;
    console.log(event)
    // set val to the value of the searchbar
    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.inList = true;
      this.displayItems = this.items.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.inList = false;
    }
  }

  search(item) {
    console.log(item)
  }

  async initializeItems() {
    const loader = await this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    });
    await loader.present();
    let holder = await this.sqlSvc.getAmbassadorsData();
    console.log(holder)
    if (holder.length == 0) {
      //load from api then save to sqlite
      this.items = await this.apiSvc.getAllAmbassadors();
      await loader.dismiss();
    } else {
      // for (let i = 0; i < holder.length; i++) {
      //   let item = holder.item(i);
      //   // do something with it

      //   this.ambassadors.push(item);
      // }
      this.items = holder;
      console.log(this.items)
      await loader.dismiss();
    }

  }
}
