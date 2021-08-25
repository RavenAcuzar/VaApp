import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from "@ionic/storage";

import { User } from '../../models/user.model';
import { Ambassador } from '../../models/ambassador.model';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-edit-va',
	templateUrl: './edit-va.page.html',
	styleUrls: ['./edit-va.page.scss'],
})
export class EditVaPage implements OnInit {

	name: string;
	mainSource: any;
	profile: Ambassador = new Ambassador();
	holder: User = new User();
	constructor(
		private https: HttpClient,
		private storage: Storage,
		private alertCtrl: AlertController,
		private aroute: ActivatedRoute,
		private router: Router) {



		this.storage.get("user")
			.then((val: User) => {
				this.name = val.Name;
				this.holder = val;
			})
			.catch((err) => {
				console.log(err);
				this.errorPrompt("Cannot retrieve session ID");
			});
	}

	ngOnInit() {
		this.aroute.queryParams.subscribe(params => {
			if (this.router.getCurrentNavigation().extras.state) {
				this.mainSource = this.router.getCurrentNavigation().extras.state.data;
			}
		})


		this.profile.ID = this.mainSource.ID;
		this.profile.Email = this.mainSource.Email;
		this.profile.Contact = this.mainSource.Contact;
		this.profile.Name = this.mainSource.Name;
		this.profile.Position = this.mainSource.Position;
	}

	errorPrompt(message: string) {
		this.alertCtrl.create({
			header: "Error",
			subHeader: message,
			buttons: ["OK"]
		}).then(alert => alert.present());
	}

	beforeSaving() {
		this.alertCtrl.create({
			header: "Change Ambassador",
			subHeader: "Are you sure you want to edit this ambassador?",
			buttons: [
				{
					text: "No"
				},
				{
					text: "Yes",
					handler: () => {
						this.saveEdits();
					}
				}
			]
		}).then(alert => alert.present());
	}

	saveEdits() {
		let body = `action=${encodeURIComponent("Ambassador_EditSingle")}` +
			`&id=${encodeURIComponent(this.profile.ID)}` +
			`&name=${encodeURIComponent(this.profile.Name)}` +
			`&position=${encodeURIComponent(this.profile.Position)}` +
			`&email=${encodeURIComponent(this.profile.Email)}` +
			`&contactnum=${encodeURIComponent(this.profile.Contact)}` +
			`&updatedby=${encodeURIComponent(this.name)}`;

		this.https.post("https://vaservice.the-v.net/site.aspx",
			body,
			{
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				responseType: "text"
			})
			.subscribe(
				res => {
					let title, sub: string;

					if (res == "True") {
						title = "Success";
						sub = "Changes Saved";

					

					}

					else {
						title = "Error";
						sub = "Something went wrong";
					}

					this.alertCtrl.create({
						header: title,
						subHeader: sub,
						buttons: ["OK"]
					}).then(alert => alert.present());
				},
				err => {
					this.errorPrompt(err);
				}
			);
	}

}
