import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from '../../models/user.model';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.page.html',
  styleUrls: ['./profile-list.page.scss'],
})
export class ProfileListPage implements OnInit {

  hasAccount: boolean = false;
  user: User;
  
  constructor(
    public navCtrl: NavController,
		private storage: Storage
  ) {
    this.storage.get("user")
				.then((val: User) => {
					if (val != undefined) {
						this.user = val;
						this.hasAccount = true;
					}
				});
   }

  ngOnInit() {
  }

  toProfile () {
    let navParams: NavigationExtras = {
			state: {
        data: this.user
			}
    }
		this.navCtrl.navigateForward(['/profile'], navParams);
	}

	toVContact () {
		this.navCtrl.navigateForward(['/contact-profiles']);
	}

}
