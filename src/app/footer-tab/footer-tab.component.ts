import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Events, AlertController } from '@ionic/angular';
import { LoginEvents } from 'src/events/login-event';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-footer-tab',
  templateUrl: './footer-tab.component.html',
  styleUrls: ['./footer-tab.component.scss'],
})
export class FooterTabComponent implements OnInit {

  tabPages: Array<{ title: string, component: string, icon: string }>;
  hasAccount=false;
  travelRequestAccessible = false;
  constructor(private router: Router,
    private storage:Storage,
    private event:Events,
    private alertCtrl:AlertController,
    private authSvc:AuthenticationService) {
    this.tabPages = [
      { title: "Home", component: '/home', icon: 'calendar' },
      { title: "My Travel", component: '/travel-request', icon: 'contacts' },
      { title: "V Ambassadors", component: '/ambassadors', icon: 'map' },
    ];
    // this.event.subscribe(LoginEvents.EVENT_CHANGE, _ => {
    //   this.retrieveData();
    // });
  }

  ngOnInit() { }

  openPage(route:string){
    if(route === '/travel-request'){
      this.authSvc.getUser().then(user => {
        //set if user is travel requester or admin
        //TODO: Add access for coporate assigned to a ambassador access to create travel request in behalf
        if(user){
          if(user.Department == 'VNS' || user.Department == 'GLAD' || user.Type == 'Poweruser' || !user.Class)
          this.router.navigate([route]);
        else
        this.alertCtrl.create({
          header: "",
          subHeader: "You do no have authorizations to view this page.",
          buttons: ["OK"]
        }).then(alert => alert.present());
        }
        else
        this.alertCtrl.create({
          header: "",
          subHeader: "You need to log-in to access this page",
          buttons: ["OK"]
        }).then(alert => alert.present());
        
      });
    }
    else
    this.router.navigate([route]);
  }
  // retrieveData() {
  //   this.storage.get("user")
  //     .then(val => {
  //      if(val!==null){
  //         this.hasAccount = true;
  //      }
  //      else
  //       this.hasAccount = false;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.hasAccount = false;
  //     });
  // }
  // footerTabClick(page: string) {
  //   if(this.hasAccount){
  //     this.router.navigate([page]);
  //   } else {
  //     if(page === '/travel-request')
  //       this.alertBox();
  //     else
  //       this.router.navigate([page]);
  //   }
  // }
  // alertBox() {
	// 	this.alertCtrl.create({
	// 		subHeader: 'You need to log-in to access this page',
	// 		buttons: ["OK"]
	// 	}).then(alert => alert.present());


	// }
}
