import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Defaults } from '../objects';
import { Nominee } from '../../models/nominee.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-nominations',
	templateUrl: './nominations.page.html',
	styleUrls: ['./nominations.page.scss'],
})
export class NominationsPage implements OnInit {

	avps: Array<Nominee> = new Array<Nominee>();
	vcs: Array<Nominee> = new Array<Nominee>();
	load: any;
	Defaults_: Defaults = new Defaults();
	//category: Array<{ name: string, value: Array<Nominee> }>;
	options: any;

	constructor(
		public navCtrl: NavController,
		private http: Http,
		private loadCtrl: LoadingController
	) {
		this.options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		});


		//this.retrieveNominees();
		// this.category = [
		// 	{ name: "AVPs", value: this.avps },
		// 	{ name: "VCs", value: this.vcs }
		// ];
	}

	ngOnInit() {

	}

	

	selectedCategory(type) {

		// console.log(content)
		// console.log(content.value)
		// console.log(content.name)

		let navParams: NavigationExtras = {
			state: {
				category: type
			}
		}
		this.navCtrl.navigateForward(['/nominee-category-holder'], navParams);
	}

}