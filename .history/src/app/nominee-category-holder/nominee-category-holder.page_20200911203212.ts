import { Component, OnInit } from '@angular/core';
import { Defaults } from '../objects';
import { Nominee } from '../../models/nominee.model';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-nominee-category-holder',
  templateUrl: './nominee-category-holder.page.html',
  styleUrls: ['./nominee-category-holder.page.scss'],
})
export class NomineeCategoryHolderPage implements OnInit {

  category: string;
	nominees: Array<Nominee>;
  Defaults_: Defaults = new Defaults();
  
  constructor(
    public navCtrl: NavController,
    private aroute: ActivatedRoute,
    private router: Router
  ) {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nominees = this.router.getCurrentNavigation().extras.state.data;
        this.category = this.router.getCurrentNavigation().extras.state.category;
      }
    })
   }

  ngOnInit() {
  }

  viewProfile (person: Nominee) {
    let navParams: NavigationExtras = {
			state: {
        data: person
			}
    }
		this.router.navigate(['/nomination-profile'], navParams);
	}
}
