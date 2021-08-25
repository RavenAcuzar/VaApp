import { Component, OnInit } from '@angular/core';
import { Defaults } from '../objects';
import { Nominee } from '../../models/nominee.model';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {  Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-nominee-category-holder',
  templateUrl: './nominee-category-holder.page.html',
  styleUrls: ['./nominee-category-holder.page.scss'],
})
export class NomineeCategoryHolderPage implements OnInit {

  category: string;
  nominees: Array<Nominee> = [];
  Defaults_: Defaults = new Defaults();

  constructor(
    public navCtrl: NavController,
    private aroute: ActivatedRoute,
    private router: Router,
    private loadCtrl:LoadingController,
    private http:Http
  ) {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
      }
    })
  }

  ngOnInit() {
    this.retrieveNominees(this.category)
  }
  retrieveNominees(type:string) {
    let load;
    let options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		});
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
     // backdropDismiss: true
    }).then(loader => {
      load = loader;
      load.present();
    });

    // let body = `action=${encodeURIComponent("Nomination_ShowCandidates")}` +
    // 	`&title=${encodeURIComponent("AVP")}`;

    let body = new URLSearchParams();
    body.set('action', 'Nomination_ShowCandidates');
    body.set('title', type);

    this.http.post("https://vaservice.the-v.net/site.aspx",
      body,
      options)
      .subscribe(
        res => {
          let result = res.json();
          for (let element in result) {
            let holder: Nominee = new Nominee();
            holder.fromJson(result[element])
            this.nominees.push(holder);
          }
          load.dismiss();
        },
        err => {
          console.log(err);
          load.dismiss();
        }
      );
  }

  viewProfile(person: Nominee) {
    let navParams: NavigationExtras = {
      state: {
        data: person
      }
    }
    this.router.navigate(['/nomination-profile'], navParams);
  }

  // goToHistory() {
  //   let navParams: NavigationExtras = {
  //     state: {
  //       data: this.category
  //     }
  //   }
  //   this.router.navigate(['/pdf-votes'], navParams);
  // }
}