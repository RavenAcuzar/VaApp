import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'

@Component({
  selector: 'app-travel-request',
  templateUrl: './travel-request.page.html',
  styleUrls: ['./travel-request.page.scss'],
})
export class TravelRequestPage implements OnInit {

  id: string;
  requests: any;
  options: any;
  load: any;

  constructor(public navCtrl: NavController,
    private http: Http,
    private loadCtrl: LoadingController,
    private aroute: ActivatedRoute,
    private router: Router) {

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });





  }

  ngOnInit() {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state.data.ID)
        console.log(this.router.getCurrentNavigation().extras.state.data["ID"])
        this.id = this.router.getCurrentNavigation().extras.state.data["ID"];
      }
    })

    this.retrieveRequests();

  }

  retrieveRequests() {
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present()
      this.load = loader;
    });

    // let body = `action=${encodeURIComponent("ViewTravelRequest")}` +
    //   `&corp=${encodeURIComponent(this.id)}`;
    let body = new URLSearchParams();
    body.set('action', 'ViewTravelRequest');
    body.set('corp', this.id);



    this.http.post("https://vaservice.the-v.net/site.aspx",
      body,
      this.options)
      .subscribe(
        res => {
          console.log(res)
          this.requests = res.json();
          this.load.dismiss();
        },
        err => {
          console.log(err);
        }
      );
  }

  viewRequest(details) {

    let navParams: NavigationExtras = {
      state: {
        data: details
      }
    }

    this.navCtrl.navigateForward(['/single-travel-request'], navParams);
  }

}
