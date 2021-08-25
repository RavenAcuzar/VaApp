import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  txtUser: string = ''
  constructor(
    private alertCtrl: AlertController,
    private apiSrvc: ApiService) { }

  ngOnInit() {
  }

  sendRequest() {
    this.apiSrvc.sendForgetPassword(this.txtUser).then(res => {
      // console.log(res['_body'])
      let result = res['_body']
      if (res = 'error') {
        this.messagePromt("Error", "Oops! Something went wrong! Please Try again.");

      }
      if (result == "True") {
        this.messagePromt("Success", "Password reset request sent! Kindly check your email.");
      }

      else {
        this.messagePromt("Error", "Sorry! But it seems you don't have an account yet.");
      }
    })
  }

  messagePromt(head: string, message: string) {
    this.alertCtrl.create({
      header: head,
      subHeader: message,
      buttons: ["OK"]
    }).then(alert => alert.present());
  }
}
