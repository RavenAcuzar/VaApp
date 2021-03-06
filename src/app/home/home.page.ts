import { Component, Optional } from '@angular/core';
import { Platform, NavController, MenuController, Events, AlertController, IonRouterOutlet } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { LoginEvents } from '../../events/login-event';
import { HomeEvent } from '../../events/home-event';
import { User } from '../../models/user.model';
import { BackButtonService } from '../back-button.service'
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  unregisterBack: any;
  user: User;
  hasAccount: boolean = false;
  isSuperuser: boolean = false;
  kind: boolean = false;
  hasNominationAccess = false;
  travelRequestAccessible = false;
  constructor(
    @Optional() private routerOutlet: IonRouterOutlet,
    private platform: Platform,
    public navCtrl: NavController,
    public menu: MenuController,
    private event: Events,
    private storage: Storage,
    private sqlite: SQLite,
    private alertCtrl: AlertController,
    private router: Router,
    private bckBtnSrvc: BackButtonService,
    private authService: AuthenticationService
  ) {

    // platform.backButton.subscribeWithPriority(0, () => {
    //   if (!this.bckBtnSrvc.alertShown) {
    //     if (this.routerOutlet.canGoBack) {
    //       this.routerOutlet.pop();
    //     }
    //     else {
    //       console.log("else")
    //       this.bckBtnSrvc.presentConfirm();
    //       this.bckBtnSrvc.confirmAlert.present().then(() =>
    //       this.bckBtnSrvc.alertShown = true)
    //     }
    //   }
    // })
    this.authService.authState.subscribe(val => {
      if (val) {
        //logged in
        this.hasAccount = true;

        this.authService.getUser().then(user => {
          //set if user is travel requester or admin
          //TODO: Add access for coporate assigned to a ambassador access to create travel request in behalf
          if(user.Department == 'VNS' || user.Department == 'GLAD' || user.Type == 'Poweruser' || !user.Class)
            this.travelRequestAccessible = true;
          else
            this.travelRequestAccessible = false;
          // if (!user.Class) {
          //   this.travelRequestAdmin = false;
          // } else if (user.Class && user.Type === 'Poweruser') {
          //   this.travelRequestAdmin = true;
          // }
          if (user.Type === 'Poweruser' || user.Type === 'V PARTNERS') {
            this.hasNominationAccess = true;
          }
          else {
            this.hasNominationAccess = false;
          }
        });
      } else {
        //logged out
        this.hasAccount = false;

      }
    });
  }
  moveToLanding(data){
    let navParams: NavigationExtras = {
      state: {
        data: data,
      }
    }
    this.router.navigate(['/tools-landing'], navParams);
  }

  openTravel() {
    // if (this.travelRequestAdmin) {
    //   let navParams: NavigationExtras = {
    //     state: {
    //       data: this.user
    //     }
    //   }
    //   this.router.navigate(['/create-travel-request'], navParams);
    // }
    // else {
      if(this.travelRequestAccessible){
        let navParams: NavigationExtras = {
          state: {
            data: this.user
          }
        }
        this.router.navigate(['/travel-request'], navParams);
      }
      else {
        this.alertCtrl.create({
          header: "",
          subHeader: "You do no have authorizations to view this page.",
          buttons: ["OK"]
        }).then(alert => alert.present());
      }
    //}
  }
  goToNomination() {
    if (this.hasAccount) {

      if (this.hasNominationAccess) {
        this.router.navigate(['/nominations'])
      }
      else {
        this.alertCtrl.create({
          header: "",
          subHeader: "You do no have authorizations to view this page.",
          buttons: ["OK"]
        }).then(alert => alert.present());
      }
    }
    else {
      this.alertCtrl.create({
        header: "",
        subHeader: "You need to log-in to access this page",
        buttons: ["OK"]
      }).then(alert => alert.present());
    }
  }
  openPage(link: string, accessible: boolean) {
    if (accessible || this.hasAccount) {

      let navParams: NavigationExtras = {
        state: {
          data: this.user
        }
      }
      this.router.navigate([link], navParams);
      //this.navCtrl.navigateRoot(link, navParams);
    }

    else {
      this.alertCtrl.create({
        header: "",
        subHeader: "You need to log-in to access this page",
        buttons: ["OK"]
      }).then(alert => alert.present());
    }
  }

}
