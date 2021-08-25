import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'
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
	category: Array<{ name: string, value: Array<Nominee> }>;
	options: any;

	constructor(
		public navCtrl: NavController,
		private http: Http,
		private router: Router,
		private loadCtrl: LoadingController
	) {
		this.options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		});


		this.retrieveNominees();
		this.category = [
			{ name: "AVPs", value: this.avps },
			{ name: "VCs", value: this.vcs }
		];
	}

	ngOnInit() {

	}

	retrieveNominees() {
		this.loadCtrl.create({
			spinner: "crescent",
			message: "Loading..."
		}).then(loader => {
			loader.present()
			this.load = loader;
		});

		// let body = `action=${encodeURIComponent("Nomination_ShowCandidates")}` +
		// 	`&title=${encodeURIComponent("AVP")}`;

		let body = new URLSearchParams();
		body.set('action', 'Nomination_ShowCandidates');
		body.set('title', 'AVP');

		this.http.post("https://vaservice.the-v.net/site.aspx",
			body,
			this.options)
			.subscribe(
				res => {
					let result = res.json();
					for (let element in result) {
						let holder: Nominee = new Nominee();
						holder.fromJson(result[element])

						this.avps.push(holder);
						console.log(this.avps)
					}
					console.log(this.avps)
				},
				err => {
					console.log(err);
				}
			);

		// body = `action=${encodeURIComponent("Nomination_ShowCandidates")}` +
		// 	`&title=${encodeURIComponent("VC")}`;
		body = new URLSearchParams();
		body.set('action', 'Nomination_ShowCandidates');
		body.set('title', 'VC');

		this.http.post("https://vaservice.the-v.net/site.aspx",
			body,
			this.options)
			.subscribe(
				res => {
					let result = res.json()
					for (let element in result) {
						let holder: Nominee = new Nominee();
						holder.fromJson(result[element]);

						this.vcs.push(holder);
						console.log(this.vcs)

					}
					// res.forEach(element => {
					// 	let holder: Nominee = new Nominee();
					// 	holder.fromJson(element);

					// 	this.vcs.push(holder);
					// });

					this.load.dismiss();
				},
				err => {
					console.log(err);
					this.load.dismiss();
				}
			);
	}

	selectedCategory(content: { name: string, value: Array<Nominee> }) {

		console.log(content)
		console.log(content.value)
		console.log(content.name)

		let navParams: NavigationExtras = {
			state: {
				data: content.value,
				category: content.name
			}
		}
		this.router.navigate(['/nominee-category-holder'], navParams);
	}

}
