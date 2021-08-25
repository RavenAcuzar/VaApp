import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate } from '@angular/router';
import { ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authSvc: AuthenticationService,
    private alertCtrl:AlertController
    ) { }

  canActivate() :boolean{
     if(!this.authSvc.isAuthenticated()){
        this.showAccessAlert();
        return false;
     }
     return this.authSvc.isAuthenticated();
  }

  async showAccessAlert(){
    const alert = await this.alertCtrl.create({
			subHeader: 'You need to log-in to access this page',
			buttons: ["OK"]
    });
    await alert.present();
  }
}
