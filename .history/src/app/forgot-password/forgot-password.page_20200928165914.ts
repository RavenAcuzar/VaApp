import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  txtUser: string = ''
  constructor(private apiSrvc: ApiService) { }

  ngOnInit() {
  }

  sendRequest() {
    this.apiSrvc.sendForgetPassword(this.txtUser).then(res => {
      console.log(res)
    })
  }
}
