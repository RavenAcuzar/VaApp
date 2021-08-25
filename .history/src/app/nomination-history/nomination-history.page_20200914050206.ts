import { Component, OnInit } from '@angular/core';
import { Defaults } from '../objects';
import { Nominee } from '../../models/nominee.model';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'

@Component({
  selector: 'app-nomination-history',
  templateUrl: './nomination-history.page.html',
  styleUrls: ['./nomination-history.page.scss'],
})
export class NominationHistoryPage implements OnInit {

  nominees;
  load;
  options;
  viewList: []
  Defaults_: Defaults = new Defaults();

  type: string = 'VP';
  constructor(public navCtrl: NavController,
    private aroute: ActivatedRoute,
    private http: Http,
    private loadCtrl: LoadingController,
    private router: Router) {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });


    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nominees = this.router.getCurrentNavigation().extras.state.data;
        this.viewList = this.nominees;
        // this.changeView();
        // this.category = this.router.getCurrentNavigation().extras.state.category;
      }
      else {
        console.log('else')
        this.retrieveNominees();
        this.viewList = this.nominees;
      }
    })
  }

  ngOnInit() {
    // this.viewList = this.nominees.filter(function (row) {
    //   return row.Title == this.type
    // })
  }

  changeView() {
    let department = this.type;
    console.log(department)
    this.viewList = this.nominees.filter(function (row) {
      return row.Title == department

    })
  }

  retrieveNominees() {
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present()
      this.load = loader;
    });

    // let body = `action=${encodeURIComponent("Nomination_ShowCandidates")}` +
    // 	`&title=${encodeURIComponent("AVP")}`;

    let body = new URLSearchParams();
    body.set('action', 'Nomination_ShowCandidates');
    body.set('title', 'AVP');

    this.http.post("https://vaservice.the-v.net/site.aspx",
      body,
      this.options)
      .subscribe(
        res => {
          let result = res.json();
          for (let element in result) {
            let holder: Nominee = new Nominee();
            holder.fromJson(result[element])


            this.nominees.push(holder);
            // console.log(this.avps)
          }
          // console.log(this.avps)
        },
        err => {
          console.log(err);
        }
      );

    // body = `action=${encodeURIComponent("Nomination_ShowCandidates")}` +
    // 	`&title=${encodeURIComponent("VC")}`;
    body = new URLSearchParams();
    body.set('action', 'Nomination_ShowCandidates');
    body.set('title', 'VC');

    this.http.post("https://vaservice.the-v.net/site.aspx",
      body,
      this.options)
      .subscribe(
        res => {
          let result = res.json()
          for (let element in result) {
            let holder: Nominee = new Nominee();
            holder.fromJson(result[element]);

            this.nominees.push(holder);
            // console.log(this.vcs)

          }
          // res.forEach(element => {
          // 	let holder: Nominee = new Nominee();
          // 	holder.fromJson(element);

          // 	this.vcs.push(holder);
          // });

          this.load.dismiss();
        },
        err => {
          console.log(err);
          this.load.dismiss();
        }
      );
  }

  viewProfile(person: Nominee) {
    let navParams: NavigationExtras = {
      state: {
        data: person
      }
    }
    this.router.navigate(['/nomination-history-profile'], navParams);
  }
}
