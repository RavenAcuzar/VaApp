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

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})

export class AppComponent {
	@ViewChildren(IonRouterOutlet) routerOutlet: QueryList<IonRouterOutlet>;

	alertShown: boolean = false;
	load: any;
	appPages: Array<{ title: string, component: string}>;
	user: User;
	hasAccount: boolean = false;
	first: boolean = true;

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
        private loadCtrl: LoadingController,
        private authenticationService: AuthenticationService) {
            this.initializeApp();
		
    }
    initializeApp(){
        this.platform.ready().then(() => {
			this.statusBar.styleDefault();
            this.splashScreen.hide();

           

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
				{ title: "My Profile", component: '/profile'},
				// { title: "Home", component: '/home'},
				{ title: "V Ambassadors", component: '/ambassadors'},
				{ title: "VA Videos", component: '/videos'},
				{ title: "Directory", component: '/directory'},
				// { title: "Corporate", component: '/corporate'},
				{ title: "My Tools", component: '/my-tools'},
				{ title: "My Tavel", component: '/travel-request' }
			];
		});
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
		this.authenticationService.getUser().then(user=>{
			console.log(user)
			this.user = user
			if(!user.Class){
				this.appPages[6].component = '/create-travel-request';
			}
			if(this.user.Type === 'Poweruser' || this.user.Type === 'V PARTNERS'){
				this.appPages.push({ title: "VA Nominations", component: '/nominations' });
			}
		});
	}

	async logOut() {
		const logoutAlert = await this.alertCtrl.create({
			header: 'Logout?',
			message: 'Are you sure you want to logout?',
			buttons: [
				{
					text: 'Yes',
					handler: ()=>{
						this.authenticationService.logout().then(()=>{
							this.appPages.pop();
							this.appPages[6].component = '/travel-request';
						});
					}
				},
				{
					text:'Cancel',
					role: 'Cancel'
				}
			]
		});
		await logoutAlert.present();
	}
}
