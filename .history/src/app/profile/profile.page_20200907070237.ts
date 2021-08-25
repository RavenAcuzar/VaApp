import { Component, OnInit } from '@angular/core';
import { Defaults } from '../objects';
import { User } from '../../models/user.model';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: User;
  Defaults_: Defaults = new Defaults();

  constructor(
    public navCtrl: NavController,
    private aroute: ActivatedRoute,
    private router: Router
  ) {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.profile = this.router.getCurrentNavigation().extras.state.data;
      }
    })
  }

  ngOnInit() {
  }

  edit () {
    let navParams: NavigationExtras = {
			state: {
        data: this.profile
			}
    }
		this.navCtrl.navigateForward(['/edit-power'], navParams);
	}

}
