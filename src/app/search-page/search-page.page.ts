import { Component, OnInit } from '@angular/core';

import { Ambassador } from '../../models/ambassador.model';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SqliteService } from '../services/sqlite.service';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

  // searchbar = document.querySelector('ion-searchbar')
  items= Array<Ambassador>();
  displayItems: Array<Ambassador> = new Array<Ambassador>();

  inList: boolean = false;
  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    private router: Router,
    private loadCtrl: LoadingController,
    private sqlSvc: SqliteService,
    private authSvc: AuthenticationService,
    private alertCtrl:AlertController
  ) {

    // this.searchbar.addEventListener('ionInput', this.handleInput);
    this.initializeItems()
  }

  ngOnInit() {
  }

  handleInput(event) {
    // this.initializeItems();
    this.displayItems = this.items;
    // let holder = this.items;
    console.log(event)
    // set val to the value of the searchbar
    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.inList = true;
      this.displayItems = this.items.filter((item) => {
        // item.name = item.Name
        console.log(item)
        return (item['Name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.inList = false;
    }
  }

  search(item) {
    this.authSvc.authState.subscribe(val=>{
      if(val){
        let navParams: NavigationExtras = {
          state: {
            data: item,
            id: item.ID,
            fromSearch: true,
          }
        }
        // this.navCtrl.navigateForward(['/profile'], navParams);
    
        this.router.navigate(['/ambassador-profile'], navParams);
      }
      else {
        this.alertCtrl.create({
          header: "",
          subHeader: "You need to log-in to access this page",
          buttons: ["OK"]
        }).then(alert => alert.present());
      }
    })
   
  }

  async initializeItems() {
    const loader = await this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    });
    await loader.present();
    let holder = await this.sqlSvc.getAmbassadorsData();
    console.log(holder)
    // if (holder.length == 0) {
    //   //load from api then save to sqlite
    //   this.items = await this.apiSvc.getAllAmbassadors();
    //   await loader.dismiss();
    // } else {
    // for (let i = 0; i < holder.length; i++) {
    //   let item = holder.item(i);
    //   // do something with it

    //   this.ambassadors.push(item);
    // }
    for (let i = 0; i < holder.length; i++) {
     // let item = holder.item(i);
      // do something with it
      let a = new Ambassador();
          a.fromJson(holder.item(i));
      this.items.push(a);
      // }
      // this.corporate = holder;
    }

    // this.items = holder;
    // this.items = this.items.filter(row => {
    //   return row['irid'] !== '0000000';
    //   // });
    //   console.log(this.items)
    // })
    await loader.dismiss();

  }
}
