import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.page.html',
	styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

	ID: string;
	user: string;
	pass: string = "";
	verif1: string = "";
	verif2: string = "";

	constructor(public navCtrl: NavController,
		private http: HttpClient,
		private alertCtrl: AlertController,
		private aroute: ActivatedRoute,
		private router: Router) {


	}

	ngOnInit() {
		let holder: any;

		this.aroute.queryParams.subscribe(params => {
			if (this.router.getCurrentNavigation().extras.state) {
				holder = this.router.getCurrentNavigation().extras.state.data;
			}
		})

		this.ID = holder.ID;
		this.user = holder.Email;
	}

	messagePrompt(head: string, message: string) {
		let alert = this.alertCtrl.create({
			header: head,
			subHeader: message,
			buttons: ["OK"]
		}).then(alert => alert.present());

	}

	checkNew(): boolean {
		return (this.verif1 == this.verif2 && this.verif1.length > 0 && this.verif2.length > 0);
	}

	beforeSaving() {
		this.alertCtrl.create({
			message: "Change Password",
			subHeader: "Are you sure you wish to change the password?",
			buttons: [
				{
					text: "No"
				},
				{
					text: "Yes",
					handler: () => {
						this.save();
					}
				}
			]
		}).then(alert => alert.present());
	}

	save() {
		let body = `action=${encodeURIComponent("CheckLogin")}` +
			`&user=${encodeURIComponent(this.user)}` +
			`&pw=${encodeURIComponent(this.pass)}`;

		this.http.post("https://vaservice.the-v.net/site.aspx",
			body,
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } })
			.subscribe(
				res => {
					if (!(res[0] == undefined || res[0]["Data"] == "false" || res[0]["Info"] == "action is null")) {
						let body = `action=${encodeURIComponent("User_ChangePassword")}` +
							`&id=${encodeURIComponent(this.ID)}` +
							`&pw=${encodeURIComponent(this.verif1)}` +
							`&user=${encodeURIComponent(this.user)}`;

						this.http.post("https://vaservice.the-v.net/site.aspx",
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
										sub = "Password Changed";
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
									console.log(err);
								}
							);
					}

					else {
						this.messagePrompt("Error", "Incorrect Password");
					}
				},
				err => {
					console.log(err);
				}
			);
	}

}
