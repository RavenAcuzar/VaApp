import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController } from '@ionic/angular';

import { User } from '../../models/user.model';
import { Defaults } from '../objects';
import { Nominee } from '../../models/nominee.model';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
	selector: 'app-nomination-profile',
	templateUrl: './nomination-profile.page.html',
	styleUrls: ['./nomination-profile.page.scss'],
})
export class NominationProfilePage implements OnInit {

	userID: string;
	canVote: boolean = false;
	voter: boolean = false;
	rating: number;
	profile: Nominee;
	Defaults_: Defaults = new Defaults();
	informationToggle: boolean = false;
	earningsToggle: boolean = false;
	constructor(
		public navCtrl: NavController,
		private http: HttpClient,
		private storage: Storage,
		private alertCtrl: AlertController,
		private aroute: ActivatedRoute,
		private router: Router
	) {
		this.aroute.queryParams.subscribe(params => {
			if (this.router.getCurrentNavigation().extras.state) {
				this.profile = this.router.getCurrentNavigation().extras.state.data;
			}
		})
		this.rating = 1;

		this.storage.get("user")
			.then((val: User) => {
				if (!val.Class) {
					this.voter = true;
					this.userID = val.ID;
					this.retrieveStats();
				}
			});
	}

	ngOnInit() {
	}

	retrieveStats() {
		let body: string = `action=${encodeURIComponent("Nomination_IsEnabled")}` +
			`&candidateID=${encodeURIComponent(this.profile.ID)}` +
			`&userID=${encodeURIComponent(this.userID)}`;

		this.http.post("https://vaservice.the-v.net/site.aspx",
			body,
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } })
			.subscribe(
				res => {
					if (res[0] != undefined) {
						this.rating = res[0].Rate;
					}

					else {
						this.canVote = true;
					}
				},
				err => this.messagePrompt("Error", "Something went wrong")
			);
	}

	messagePrompt(head: string, message: string) {
		this.alertCtrl.create({
			header: head,
			subHeader: message,
			buttons: ["OK"]
		}).then(alert => alert.present());
	}

	paymentYear(): string {
		let curDate: number = new Date().getFullYear();

		return `from April ${curDate - 1} to March ${curDate}`;
	}

	beforeSaving() {
		this.alertCtrl.create({
			header: "Submit Vote",
			subHeader: "Are you sure you want to submit your vote?",
			buttons: [
				{
					text: "No"
				},
				{
					text: "Yes",
					handler: () => {
						this.postForm();
					}
				}
			]
		}).then(alert => alert.present());
	}

	postForm() {
		// let body = {};
		// body['candidateId'] = this.profile.ID;
		// body['rating'] = this.rating.toString();
		// body['userId'] = '2CD7D7D2-2C14-4456-B24D-E57FAE8D3FB1';
		// body = JSON.stringify(body)


		let body: string = `action=${encodeURIComponent("Nomination_VoteCandidate")}` +
			`&rate=${encodeURIComponent(this.rating.toString())}` +
			`&candidateID=${encodeURIComponent(this.profile.ID)}` +
			`&userID=${encodeURIComponent(this.userID)}`;
		console.log(body)
		this.http.post("https://vaservice.the-v.net/site.aspx",
			// this.http.post("http://192.168.1.101:8080/voteCandidate",
			body,
			// { data: body },
			{
				// headers: { "Content-Type": "application/json" },
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				responseType: "text"
			})
			.subscribe(
				res => {
					console.log(res)

					if (res == "True") {
						this.messagePrompt("Success", "Vote Successful");
					}

					else {
						this.messagePrompt("Error", "Something went wrong");
					}
				},
				err => this.messagePrompt("Something went wrong", err)
			);
	}

}
