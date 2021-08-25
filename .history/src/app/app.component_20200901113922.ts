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

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})

export class AppComponent {
	@ViewChildren(IonRouterOutlet) routerOutlet: QueryList<IonRouterOutlet>;

	userQuery: string = `create table UserData(
		ID varchar(63),
		Image varchar(127),
		Name varchar(63),
		Email varchar(63),
		Type varchar(31),
		ContactNumber varchar(63),
		CompanyTitle varchar(127),
		Region varchar(15),
		Keynum int
	);`;

	ambassadorQuery: string = `create table Ambassador(
		ID varchar(63),
		title varchar(63),
		position varchar(63),
		companytitle varchar(63),
		name varchar(127),
		irid varchar(15),
		team varchar(31),
		email varchar(127),
		contactnum varchar(31),
		imgUrl varchar(127),
		Status varchar(15),
		Rank varchar(31),
		NewDescription varchar(4095)
	);`;

	corporateQuery: string = `create table Corporate(
		ID varchar(63),
		runningNum varchar(15),
		Title varchar(15),
		Name varchar(63),
		CompanyTitle varchar(63),
		ContactNumber varchar(31),
		Email varchar(127),
		Department varchar(15),
		Region varchar(63),
		Image varchar(127)
	);`;

	versionQuery: string = `create table Version(
		id int,
		current varchar(7)
	);`;

	alertShown: boolean = false;
	load: any;
	appPages: Array<{ title: string, component: string, accessible: boolean }>;
	user: User;
	hasAccount: boolean = false;
	first: boolean = true;

	constructor(
		private platform: Platform,
		private navCtrl: NavController,
		private router: Router,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private storage: Storage,
		private event: Events,
		private sqlite: SQLite,
		private http: Http,
		private menu: MenuController,
		private alertCtrl: AlertController,
		private loadCtrl: LoadingController) {
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();

			platform.backButton.subscribeWithPriority(0, () => {
				console.log("test")
				// console.log(this.routerOutlet.canGoBack)
				// console.log(this.routerOutlet.canGoBack())
				// console.log(this.routerOutlet)

				// if (!this.alertShown) {
				// 	if (this.routerOutlet.canGoBack) {
				// 		this.routerOutlet.pop();
				// 	}
				// 	else {
				// 		this.presentConfirm();
				// 	}
				// }

				this.routerOutlet.forEach((outlet: IonRouterOutlet) => {
					if (outlet && outlet.canGoBack()) {
						outlet.pop();
					}
					else {
						this.presentConfirm();
					}
				})
			})


			this.loadCtrl.create({
				spinner: "crescent",
				message: "Downloading..."
			}).then(loader => {
				this.load = loader;
			});

			this.event.subscribe(LoginEvents.EVENT_CHANGE, _ => {
				this.retrieveData();
			});

			this.appPages = [
				{ title: "Profiles", component: '/profile-list', accessible: true },
				{ title: "V Ambassadors", component: '/ambassadors', accessible: true },
				{ title: "Notifications", component: '/notifications', accessible: true },
				{ title: "Videos", component: '/videos', accessible: true },
				{ title: "Corporate", component: '/corporate', accessible: false },
				{ title: "My Tools", component: '/my-tools', accessible: false },
				{ title: "Travel Requests", component: '/travel-request', accessible: false }
			];


			// this.http.get('http://localhost:8080/gbd').subscribe(res => {
			// 	console.log(res.json())
			// })

			// this.sqlite.create({
			// 	name: "vapp.db",
			// 	location: "default"
			// }).then((db: SQLiteObject) => {
			// 	db.executeSql(this.userQuery, [])
			// 		.then(() => db.executeSql(this.ambassadorQuery, [])
			// 			.then(() => db.executeSql(this.corporateQuery, [])
			// 				.then(() => db.executeSql(this.versionQuery, [])
			// 					// .then(() => this.versionChecker())
			// 				)))
			// 	// .catch(() => this.versionChecker());

			// 	db.executeSql("select * from UserData", [])
			// 		.then(val => {
			// 			console.log(val.rows);

			// 			if (val.rows.length > 0) {
			// 				this.user = new User();
			// 				this.user.fromJson(val.rows.item(0), val.rows.item(0).Keynum == 9);

			// 				this.appPages[6].component = this.user.Class ? this.appPages[6].component : '/create-travel-request';

			// 				if (this.user.Type && this.first) {
			// 					this.first = false;
			// 					this.appPages.push({ title: "Nominations", component: '/nominations', accessible: false });
			// 				}

			// 				this.hasAccount = true;
			// 			}
			// 		})
			// 		.catch(err => console.log(err));
			// }).catch(err => console.log(err));
		});
	}

	presentConfirm() {
		this.alertCtrl.create({
			header: "Confirm Exit",
			subHeader: "Are you sure you want to exit?",
			buttons: [
				{
					text: "No",
					handler: () => {
						this.alertShown = false;
					}
				},
				{
					text: "Yes",
					handler: () => {
						navigator['app'].exitApp();
					}
				}
			]
		}).then(loader => {
			loader.present().then(() =>
				this.alertShown = true)
		});
	}

	goHome() {
		this.navCtrl.navigateRoot('/home');
	}

	openPage(p: { title: string, component: string, accessible: boolean }) {
		console.log(p)
		if (this.hasAccount || p.accessible) {
			let navParams: NavigationExtras = {
				state: {
					data: this.user
				}
			}
			this.navCtrl.navigateRoot(p.component, navParams);
		}

		else {
			this.alertBox("", "You need to log-in to access this page");
		}
	}

	openProfile() {
		if (!(this.user.Name == undefined)) {
			let navParams: NavigationExtras = {
				state: {
					data: this.user
				}
			}
			this.navCtrl.navigateForward(['/profile'], navParams);
		}
	}

	// versionChecker() {
	// 	this.sqlite.create({
	// 		name: "vapp.db",
	// 		location: "default"
	// 	}).then((db: SQLiteObject) => {
	// 		db.executeSql("select * from Version", [])
	// 			.then(val => {
	// 				this.http.get("https://cums.the-v.net/upgrade.aspx")
	// 					.subscribe(
	// 						res => {
	// 							if (val.rows.length > 0) {
	// 								if (Number(val.rows.item(0).current) < Number(res)) {
	// 									db.executeSql("delete from Ambassador; delete from Corporate;", [])
	// 										.then(() => {
	// 											this.alertCtrl.create({
	// 												header: "Outdated Version",
	// 												subHeader: "You must update your app to continue",
	// 												buttons: [
	// 													{
	// 														text: "OK",
	// 														handler: () => {
	// 															this.load.present();
	// 															let query: string = `update Version set current = '${res}' where id = '1'`;

	// 															this.event.subscribe(DownloadsEvent.EVENT_CHANGE, _ => {
	// 																db.executeSql(query, []);
	// 																this.load.dismiss();
	// 															});

	// 															let download = new Downloader(this.http, this.sqlite, this.event);
	// 															download.storeInLocal();
	// 															console.log("dlstlcl")
	// 														}
	// 													}
	// 												]
	// 											}).then(alert => alert.present())
	// 										})

	// 								}
	// 							}

	// 							else {
	// 								this.alertCtrl.create({
	// 									header: "Outdated Version",
	// 									subHeader: "You must update your app to continue",
	// 									buttons: [
	// 										{
	// 											text: "OK",
	// 											handler: () => {
	// 												this.load.present();
	// 												let val: string = `insert into Version values('1', '${res}')`;

	// 												this.event.subscribe(DownloadsEvent.EVENT_CHANGE, _ => {
	// 													db.executeSql(val, []);
	// 													this.load.dismiss();
	// 												})

	// 												let download = new Downloader(this.http, this.sqlite, this.event);
	// 												download.storeInLocal();
	// 											}
	// 										}
	// 									]
	// 								}).then(alert => alert.present());
	// 							}
	// 						},
	// 						err => console.log(err)
	// 					);
	// 			}).catch(err => console.log(err))
	// 	}).catch(err => console.log(err));
	// }

	retrieveData() {
		this.storage.get("user")
			.then((val: User) => {
				this.user = val;

				this.appPages[6].component = this.user.Class ? this.appPages[6].component : "CreateTravelRequestPage";

				if (this.user.Type && this.first) {
					this.first = false;
					this.appPages.push({ title: "Nominations", component: '/nominations', accessible: false });
				}

				this.hasAccount = true;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	logOut() {
		this.storage.clear()
			.then(() => {
				this.menu.close()
					.then(() => {
						this.hasAccount = false;

						// this.sqlite.create({
						// 	name: "vapp.db",
						// 	location: "default"
						// }).then((db: SQLiteObject) => {
						// 	db.executeSql(`delete from UserData`, [])
						// 		.then(() => {
						// 			if (this.user.Type) {
						// 				this.appPages.pop();
						// 				this.user = null;
						// 			}

						// 			this.alertBox("Success", "You have been logged out");
						// 			this.navCtrl.navigateRoot('/home');
						// 		})
						// 		.catch(err => console.log(err));
						// });
					})
					.catch(err => this.alertBox("Error", err));


			});
	}

	logIn() {
		console.log("Hello")
		this.navCtrl.navigateForward('login');
	}

	adminLogIn() {
		console.log("Hello")
		this.navCtrl.navigateForward('login-admin');
	}

	goToVotes() {
		this.navCtrl.navigateForward('pdf-votes');

	}

	alertBox(head: string, message: string) {
		this.alertCtrl.create({
			header: head,
			subHeader: message,
			buttons: ["OK"]
		}).then(alert => alert.present());


	}
}
