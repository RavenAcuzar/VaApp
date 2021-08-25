import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { LoginEvents } from '../../events/login-event';
import { HomeEvent } from '../../events/home-event';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	txtUser: string;
	pbxPass: string;

	constructor(
		private router:Router,
		private alertCtrl: AlertController,
		private authSvc: AuthenticationService
	) {
		
	}

	ngOnInit() {
	}

	errorPrompt(message: string) {
		this.alertCtrl.create({
			header: "Error",
			subHeader: message,
			buttons: ["OK"]
		}).then(alert => alert.present());
	}

	logIn() {
		if (this.txtUser === undefined || this.pbxPass === undefined) {
			this.errorPrompt("Please provide email/password");
		}

		else {
			console.log(this.txtUser)
			console.log(this.pbxPass)

			this.authSvc.login(this.txtUser, this.pbxPass)
			.then(isLogged=>{
				if(isLogged)
					this.router.navigate(['/home']);
				else
					this.errorPrompt("Wrong email/password");
			})
			.catch(err=>{
				console.log(err);
				this.errorPrompt('Fatal Error');
			})
			
		}
	}

}
