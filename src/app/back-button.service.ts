import { Injectable, ViewChildren } from '@angular/core';
import { Platform, MenuController, Events, AlertController, LoadingController, IonRouterOutlet, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  @ViewChildren(IonRouterOutlet) routerOutlet: IonRouterOutlet;

	alertShown: boolean = false;
  confirmAlert: any;

  constructor(
    private platform: Platform,
    private alertCtrl: AlertController
  ) { }

  subscribeBackButton() {
  }

  presentConfirm() {
    console.log("confirm")
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
      this.confirmAlert = loader;
		});
	}

}
