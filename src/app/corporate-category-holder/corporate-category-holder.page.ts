import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from '@ionic/angular';

import { Defaults } from '../objects';
import { Corporate } from '../../models/corporate.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-corporate-category-holder',
  templateUrl: './corporate-category-holder.page.html',
  styleUrls: ['./corporate-category-holder.page.scss'],
})
export class CorporateCategoryHolderPage implements OnInit {

  category: { name: string, display: string };
	corporate: Corporate;
  Defaults_: Defaults = new Defaults();
  
  constructor(
    public navCtrl: NavController,
    private aroute: ActivatedRoute,
    private router: Router
  ) {

    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
        this.corporate = this.router.getCurrentNavigation().extras.state.data;
      }
    })
   }

  ngOnInit() {
  }

  viewProfile (person: Corporate) {

    let navParams: NavigationExtras = {
			state: {
        data: person
			}
    }

		this.navCtrl.navigateForward(['/corporate-profile'], navParams);
	}

}
