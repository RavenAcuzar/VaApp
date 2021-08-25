import { Component, OnInit } from '@angular/core';

import { NavParams, NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";

import { User } from '../../models/user.model';
import { Defaults } from '../objects';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-corporate-profile',
  templateUrl: './corporate-profile.page.html',
  styleUrls: ['./corporate-profile.page.scss'],
})
export class CorporateProfilePage implements OnInit {
  isSuperuser: boolean = false;
  profile: any;
  Defaults_: Defaults = new Defaults();

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private aroute: ActivatedRoute,
    private router: Router
  ) {

    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.profile = this.router.getCurrentNavigation().extras.state.data;
      }
    })

    this.storage.get("user")
      .then((val: User) => {
        this.isSuperuser = val.Type && val.Class;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

  edit() {

    let navParams: NavigationExtras = {
      state: {
        data: this.profile
      }
    }
    console.log(navParams)
    this.navCtrl.navigateForward(['/edit-power'], navParams);
  }

}
