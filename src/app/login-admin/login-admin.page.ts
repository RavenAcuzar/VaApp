import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from '@ionic/angular';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { LoginEvents } from '../../events/login-event';
import { HomeEvent } from '../../events/home-event';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginAdminPage implements OnInit {

  txtUser: string;
  pbxPass: string;
  options: any;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private http: Http,
    private storage: Storage,
    private sqlite: SQLite,
    private event: Events
  ) {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  ngOnInit() {
  }

  errorPrompt(message: string) {
    this.alertCtrl.create({
      header: "Error",
      subHeader: message,
      buttons: ["OK"]
    }).then(alert => alert.present());
  }

  logIn() {
    if (this.txtUser === undefined || this.pbxPass === undefined) {
      this.errorPrompt("Please provide email/password");
    }

    else {
      // let body = new URLSearchParams();
      // // `action=${encodeURIComponent("CheckLogin")}` +
      // // 	`&user=${encodeURIComponent(this.txtUser)}` +
      // // 	`&pw=${encodeURIComponent(this.pbxPass)}`;
      // body.set('action', 'CheckLogin');
      // body.set('user', this.txtUser);
      // body.set('pw', this.pbxPass);
      // sqlConnection.query("SELECT * FROM `t_ambassadors` where Email='" + req.query.username + "' AND Password='" + req.query.password + "'", function (error, rows, fields) {
      // this.http.get('http://localhost:8080/corporate')

      this.http.get("http://localhost:8080/adminLogin?username=" + this.txtUser + "&password=" + this.pbxPass
        // body,
        // this.options
      )
        .subscribe(
          res => {

            let result = res.json();
            console.log(result)

            if (result.hasOwnProperty('0')) {
              if (result[0].Data == "false") {
                this.errorPrompt("Wrong username/password");
                this.pbxPass = "";
              }
              else {
                // console.log(Object.keys(result[0]).length)
                // console.log(result[0].length)
                let kind: boolean = Object.keys(result[0]).length == 20;
                console.log(Object.keys(result[0]).length)
                let user: User = new User();
                user.fromJson(result[0], kind);

                this.storage.set("user", user);
                LoginEvents.stateChanged(this.event);
                HomeEvent.stateChanged(this.event);
                this.navCtrl.pop()
                // let insertion: string = `insert into UserData values(` +
                // 	`'${user.ID}', ` +
                // 	`'${result[0].Image}', ` +
                // 	`'${user.Name}', ` +
                // 	`'${user.Email}', ` +
                // 	`'${result[0].Type}', ` +
                // 	`'${user.Contact}', ` +
                // 	`'${user.CompanyTitle}', ` +
                // 	`'${user.Region}', ` +
                // 	`'${Object.keys(result[0]).length}')`;

                // this.sqlite.create({
                // 	name: "vapp.db",
                // 	location: "default"
                // }).then((db: SQLiteObject) => {
                // 	db.executeSql(insertion, [])
                // 		.then(() => this.navCtrl.pop())
                // 		.catch((err) => console.log(err));
                // }).catch(err => console.log(err));
              }
            }

            else {
              this.errorPrompt("Wrong username/password");
              this.pbxPass = "";
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  }

}
