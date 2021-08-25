import { Component, ViewChild, Optional, ViewChildren, QueryList } from '@angular/core';
import { Platform, MenuController, Events, AlertController, LoadingController, IonRouterOutlet, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Http } from '@angular/http';

import { LoginEvents } from '../events/login-event';
import { DownloadsEvent } from '../events/downloads-event';
import { User } from '../models/user.model';
import { Defaults } from './objects';
import { Downloader } from '../models/downloader.model';
import { async } from '@angular/core/testing';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { ApiService } from './services/api.service';
import { SqliteService } from './services/sqlite.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})

export class AppComponent {
	@ViewChildren(IonRouterOutlet) routerOutlet: QueryList<IonRouterOutlet>;

	alertShown: boolean = false;
	load: any;
	appPages: Array<{ title: string, component: string, accesible: boolean }>;
	user: User;
	hasAccount: boolean = false;
	first: boolean = true;
	Defaults_: Defaults = new Defaults();
	corp;
	constructor(
		private platform: Platform,
		private router: Router,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private storage: Storage,
		private event: Events,
		private sqlite: SQLite,
		private http: Http,
		private menu: MenuController,
		private alertCtrl: AlertController,
		private sqlSvc: SqliteService,
		private loadCtrl: LoadingController,
		private apiSvc: ApiService,
		private authenticationService: AuthenticationService) {
		this.initializeApp();

	}
	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();

			// this.initSqlData();
			// const waitInit = async () => {
			// 	await this.initSqlData();
			// }

			// waitInit();
			// this.splashScreen.hide();



			this.platform.backButton.subscribeWithPriority(0, () => {
				this.routerOutlet.forEach((outlet: IonRouterOutlet) => {
					if (outlet && outlet.canGoBack()) {
						outlet.pop();
					}
					else {
						this.confirmAppExit();
					}
				})
			})

			this.authenticationService.authState.subscribe(state => {
				if (state) {
					this.retrieveData();
					this.hasAccount = true;
				} else {
					this.hasAccount = false;
				}
			});
			this.event.subscribe(LoginEvents.EVENT_CHANGE, _ => {

			});


			this.appPages = [
				// { title: "My Profile", component: '/profile'},
				// { title: "Home", component: '/home'},
				{ title: "V Ambassadors", component: '/ambassadors', accesible: this.hasAccount },
				{ title: "VA Videos", component: '/videos', accesible: true },
				{ title: "Directory", component: '/directory', accesible: true },
				// { title: "Corporate", component: '/corporate'},
				{ title: "My Tools", component: '/tools', accesible: this.hasAccount },
				{ title: "My Tavel", component: '/travel-request', accesible: this.hasAccount }
			];
		});


		this.initSqlData()

	}

	openPage(route, access) {
		if (!access) {
			this.alertCtrl.create({
				header: "",
				subHeader: "You need to log-in to access this page",
				buttons: ["OK"]
			}).then(alert => alert.present());
		}
		else {
			// console.log(route)
			this.router.navigate([route])
		}
	}
	goToProfile() {

		let navParams: NavigationExtras = {
			state: {
				data: this.user
			}
		}
		this.router.navigate(['/profile'], navParams);
	}

	async confirmAppExit() {
		const loader = await this.alertCtrl.create({
			header: "Confirm Exit",
			subHeader: "Are you sure you want to exit?",
			buttons: [
				{
					text: "No",
					role: 'Cancel',
				},
				{
					text: "Yes",
					handler: () => {
						navigator['app'].exitApp();
					}
				}
			]
		});
		await loader.present();
	}

	retrieveData() {
		this.authenticationService.getUser().then(user => {
			console.log(user)
			this.user = user
			if (!user.Class) {
				this.appPages[6].component = '/travel-request';
			}
			if (this.user.Type === 'Poweruser' || this.user.Type === 'V PARTNERS') {
				this.appPages[6].component = '/create-travel-request';
				this.appPages.push({ title: "VA Nominations", component: '/nominations', accesible: true });
			}


		});

		this.appPages.forEach(page => {
			page.accesible = true;
		})
	}

	async initSqlData() {
		await this.sqlSvc.getAmbassadorsData().then(async res => {
			console.log(resF)
			if (res.length == 0) {
				console.log('NOT EMPTY' + res.length)
				await this.apiSvc.getAllAmbassadors();
			}

			await this.sqlSvc.getCorporatesData().then(async res => {
				console.log('NOT EMPTY' + res.length)

				if (res.length == 0) {
					await this.apiSvc.getAllAmbassadors();
				}
				this.splashScreen.hide();

			});
		});



		// if (holder.length == 0) {
		// 	//load from api then save to sqlite
		// 	console.log('NOT EMPTY')
		// 	const amb = await this.apiSvc.getAllAmbassadors();
		// }

		// let corpholder = await this.sqlSvc.getCorporatesData();

		// console.log(corpholder)
		// console.log(corpholder.length)
		// if (corpholder.length == 0) {
		// 	//load from api then save to sqlite
		// 	console.log('NOT EMPTY')

		// 	this.corp = await this.apiSvc.getAllAmbassadors();
		// }
		// return await this.apiSvc.getAllAmbassadors().then(async () => {
		// 	await this.apiSvc.getAllCorp().then(() => {
		// 	});

		// });

	}

	async logOut() {
		const logoutAlert = await this.alertCtrl.create({
			header: 'Logout?',
			message: 'Are you sure you want to logout?',
			buttons: [
				{
					text: 'Yes',
					handler: () => {
						this.authenticationService.logout().then(() => {
							this.appPages = [
								// { title: "My Profile", component: '/profile'},
								// { title: "Home", component: '/home'},
								{ title: "V Ambassadors", component: '/ambassadors', accesible: this.hasAccount },
								{ title: "VA Videos", component: '/videos', accesible: true },
								{ title: "Directory", component: '/directory', accesible: true },
								// { title: "Corporate", component: '/corporate'},
								{ title: "My Tools", component: '/tools', accesible: this.hasAccount },
								{ title: "My Tavel", component: '/travel-request', accesible: this.hasAccount }
							];

						});
					}
				},
				{
					text: 'Cancel',
					role: 'Cancel'
				}
			]
		});
		await logoutAlert.present();
	}
}
