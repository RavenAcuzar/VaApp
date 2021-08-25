import { Component, ViewChild, Optional, ViewChildren, QueryList } from '@angular/core';
import { Platform, MenuController, Events, AlertController, LoadingController, IonRouterOutlet} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Http } from '@angular/http';

import { LoginEvents } from '../events/login-event';

import { User } from '../models/user.model';
import { Defaults } from './objects';

import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { ApiService } from './services/api.service';
import { SqliteService } from './services/sqlite.service';
import { NotificationServiceService } from './notification-service.service';


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
	isCorpStaff: boolean = false;
	isAssignedToAmbassador: boolean = false;
	isPowerUser: boolean = false;
	isVP: boolean = false;
	corp;
	travelRequestAccessible = false;
	constructor(
		private platform: Platform,
		private router: Router,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,

		private event: Events,
		private sqlite: SQLite,
		private http: Http,
		private menu: MenuController,
		private alertCtrl: AlertController,
		private sqlSvc: SqliteService,
		private loadCtrl: LoadingController,
		private apiSvc: ApiService,
		private authenticationService: AuthenticationService,
		private notifSvc:NotificationServiceService
		) {
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
			this.notifSvc.initPush();
			this.authenticationService.authState.subscribe(state => {
				if (state) {
					this.hasAccount = true;
					this.retrieveData();
				} else {
					this.hasAccount = false;
					this.notifSvc.clearSubs();
				}
			});
			this.event.subscribe(LoginEvents.EVENT_CHANGE, _ => {

			});


			this.appPages = [
				// { title: "My Profile", component: '/profile'},
				// { title: "Home", component: '/home'},
				{ title: "V Ambassadors", component: '/ambassadors', accesible: true },
				{ title: "VA Videos", component: '/videos', accesible: true },
				{ title: "V Directory", component: '/directory', accesible: true },
				// { title: "Corporate", component: '/corporate'},
				{ title: "My Tools", component: '/tools', accesible: this.hasAccount },
				{ title: "My Tavel", component: '/travel-request', accesible: this.hasAccount }
			];
			this.initSqlData();
			
		});	
	}

	openPage(route, access) {
		if (!access) {
			this.alertCtrl.create({
				header: "",
				subHeader: "You need to log-in to access this page",
				buttons: ["OK"]
			}).then(alert => alert.present());
		}
		else if(route == "/travel-request"){
			// console.log(route)	
			if(this.travelRequestAccessible)
				this.router.navigate([route])
			else
			this.alertCtrl.create({
				header: "",
				subHeader: "You do no have authorizations to view this page.",
				buttons: ["OK"]
			  }).then(alert => alert.present());
		}
		else
			this.router.navigate([route])
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
		this.appPages = [
			// { title: "My Profile", component: '/profile'},
			// { title: "Home", component: '/home'},
			{ title: "V Ambassadors", component: '/ambassadors', accesible: true},
			{ title: "VA Videos", component: '/videos', accesible: true },
			{ title: "V Directory", component: '/directory', accesible: true },
			// { title: "Corporate", component: '/corporate'},
			{ title: "My Tools", component: '/tools', accesible: this.hasAccount },
			{ title: "My Travel", component: '/travel-request', accesible: this.hasAccount }
		];

		this.authenticationService.getUser().then(user => {
			console.log(user);
			this.user = user;
			//console.log(this.appPages)
			if(user)
				this.notifSvc.subscribe(user.IRID);

			if(user.Department == 'VNS' || user.Department == 'GLAD' || user.Type == 'Poweruser' || !user.Class)
            this.travelRequestAccessible = true;
          else
			this.travelRequestAccessible = false;
			
			if (this.user.Type === 'Poweruser') {
				this.appPages.push({ title: "VA Nomination History", component: '/nomination-history-holder', accesible: true });

			}
			
			/*if (!user.Class) {
				this.appPages[4].component = '/travel-request';
			}
			if (this.user.Type === 'Poweruser' || this.user.Type === 'V PARTNERS') {
				this.appPages[4].component = '/create-travel-request';
				this.appPages.push({ title: "VA Nominations", component: '/nominations', accesible: true });
			}
			

			*/

		});

		// this.appPages.forEach(page => {
		// 	page.accesible = true;
		// })
	}

	async initSqlData() {

		let amb = await this.sqlSvc.getAmbassadorsData();
		if (amb.length == 0) {
			await this.apiSvc.getAllAmbassadors();
		} else {
			await this.apiSvc.checkforUpdates('ambassador');
		}

		let corp = await this.sqlSvc.getCorporatesData();
		if (corp.length == 0) {
			await this.apiSvc.getAllCorp();
		} else {
			await this.apiSvc.checkforUpdates('corp');
		}
		this.splashScreen.hide;
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
								{ title: "V Directory", component: '/directory', accesible: true },
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
