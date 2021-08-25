import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AuthenticationService } from './services/authentication.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  private topics = [];
  private pushObject:PushObject;
  constructor(private push:Push, private authSvc:AuthenticationService,
    private toastCtrl:ToastController) { 

  }
  async initPush(){
    let user = await this.authSvc.getUser();
      if(user){
        this.topics.push(user.IRID);
      }
      const options : PushOptions = {
        android: {
          topics: this.topics,
          icon: 'ic_stat_icon'
        },
        ios: {
          topics: this.topics,
        }
       }
    this.pushObject = this.push.init(options);
    this.pushObject.on('notification').subscribe((notification: any) => {
			console.log('Received a notification', notification)
			if(notification.additionalData.foreground){
				this.showNotifToast(notification.title);
			}
		});

		this.pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

		this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  subscribe(topic){
    this.pushObject.subscribe(topic).then(()=>{
      this.topics.push(topic);
    },
    (err)=>{
      console.log("Error subscribe to topic", err);
    })
  }
  clearSubs(){
    this.topics.forEach(e=>{
      console.log(e);
      this.pushObject.unsubscribe(e);
    })    
  }
  private async showNotifToast(message){
		let toast = await this.toastCtrl.create({
			position: "bottom",
			message: message,
			duration: 3000,
			buttons: [{
				text: 'Close',
				role: 'cancel',
				handler: ()=>{

				}
			}]
		});
		toast.present();
	}	
}
