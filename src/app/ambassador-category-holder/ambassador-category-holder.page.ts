import { Component, OnInit, Optional } from '@angular/core';

import { Ambassador } from '../../models/ambassador.model';
import { Defaults } from '../objects';
import { NavController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
	selector: 'app-ambassador-category-holder',
	templateUrl: './ambassador-category-holder.page.html',
	styleUrls: ['./ambassador-category-holder.page.scss'],
})
export class AmbassadorCategoryHolderPage implements OnInit {

	category: string;
	ambassador: Ambassador;
	Defaults_: Defaults = new Defaults();

	constructor(
		@Optional() private ionRoute: IonRouterOutlet,
		private navCtrl: NavController,
		private aroute: ActivatedRoute,
		private router: Router
	) {
		this.aroute.queryParams.subscribe(params => {
			if(this.router.getCurrentNavigation().extras.state){
				this.category = this.router.getCurrentNavigation().extras.state.category;
				this.ambassador = this.router.getCurrentNavigation().extras.state.data;
			}
		})
	 }

	ngOnInit() {
	}

	handlePerson(person: Ambassador) {
		if (this.category == "V FOUNDERS" || this.category == "V PARTNERS") {
			this.openProfile(person);
		}

		else {
			this.openContact(person);
		}
	}

	openProfile(person: Ambassador) {
		let navParams: NavigationExtras = {
			state: {
				data: person
			}
		}
		// this.navCtrl.navigateForward(['/profile'], navParams);

		this.navCtrl.navigateForward(['/ambassador-profile'], navParams);
	}

	openContact(person: Ambassador) {
		let navParams: NavigationExtras = {
			state: {
				data: person
			}
		}

		this.navCtrl.navigateForward(['/ambassador-contact'], navParams);
	}

}
