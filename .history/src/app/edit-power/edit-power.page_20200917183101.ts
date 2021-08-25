import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from "@ionic/storage";

import { User } from '../../models/user.model';
import { Corporate } from '../../models/corporate.model';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-edit-power',
  templateUrl: './edit-power.page.html',
  styleUrls: ['./edit-power.page.scss'],
})
export class EditPowerPage implements OnInit {
  name: string;
  mainSource: any;
  disablePosition: boolean;
  profile: Corporate = new Corporate();
  type: string;
  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private storage: Storage,
    private alertCtrl: AlertController,
    private aroute: ActivatedRoute,
    private router: Router
  ) {




    this.storage.get("user")
      .then((val: User) => {
        this.name = val.Name;
        this.disablePosition = val.Class;
      })
      .catch((err) => {
        console.log(err);
        this.errorPrompt("Cannot retrieve session ID");
      });
  }

  ngOnInit() {
    this.aroute.queryParams.subscribe(params => {
      console.log(params)
      console.log(this.router.getCurrentNavigation().extras.state)
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state.data)
        this.mainSource = this.router.getCurrentNavigation().extras.state.data;
        console.log(this.mainSource.Type)
        
        if (this.mainSource.Type) {
          this.type == 'Corp'
        }
        else {
          this.type == 'Ambassador'
        }
      }
    })

    console.log(this.mainSource)


    this.profile.ID = this.mainSource.ID;
    this.profile.Email = this.mainSource.Email;
    this.profile.Name = this.mainSource.Name;
    this.profile.CompanyTitle = this.mainSource.CompanyTitle;
    this.profile.Contact = this.mainSource.Contact;
  }

  errorPrompt(message: string) {
    this.alertCtrl.create({
      header: "Error",
      subHeader: message,
      buttons: ["OK"]
    }).then(alert => alert.present());
  }

  beforeSaving() {
    console.log(this.type)
    this.alertCtrl.create({
      header: "Change User",
      subHeader: "Are you sure you want to edit this user?",
      buttons: [
        {
          text: "No"
        },
        {
          text: "Yes",
          handler: () => {
            this.saveEdits();
          }
        }
      ]
    }).then(alert => alert.present());
  }

  saveEdits() {

    let action;
    if (this.type == 'Corp') {
      action = `action=${encodeURIComponent("Corporate_EditSingle")}`
    }
    else {
      action = `action=${encodeURIComponent("Ambassador_EditSingle")}`
    }
    let body = action +
      `&id=${this.profile.ID}` +
      `&name=${encodeURIComponent(this.profile.Name)}` +
      `&position=${encodeURIComponent(this.profile.CompanyTitle)}` +
      `&email=${encodeURIComponent(this.profile.Email)}` +
      `&contactnum=${encodeURIComponent(this.profile.Contact)}` +
      `&updatedby=${encodeURIComponent(this.name)}`;

    this.http.post("https://vaservice.the-v.net/site.aspx",
      body,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: "text"
      })
      .subscribe(
        res => {
          console.log(res)
          let title, sub: string;

          if (res == "True") {
            title = "Success";
            sub = "Changes Saved";
          }

          else {
            title = "Error";
            sub = "Something went wrong";
          }

          this.alertCtrl.create({
            header: title,
            subHeader: sub,
            buttons: ["OK"]
          }).then(alert => alert.present());
        },
        err => {
          this.errorPrompt(err);
          console.log(err);
        }
      )
  }

  changePass() {

    let navParams: NavigationExtras = {
      state: {
        data: this.mainSource
      }
    }

    this.navCtrl.navigateForward(['/change-password'], navParams)
  }

}
