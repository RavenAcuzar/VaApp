import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-travel-request',
  templateUrl: './travel-request.page.html',
  styleUrls: ['./travel-request.page.scss'],
})
export class TravelRequestPage implements OnInit {

  id: string;
  requests = [];
  options: any;
  load: any;
  user;

  constructor(public navCtrl: NavController,
    private http: Http,
    private loadCtrl: LoadingController,
    private apiSvc: ApiService,
    private aroute: ActivatedRoute,
    private router: Router) {

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });


    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.data;
        this.id = this.user.ID
        this.retrieveRequests();

      }
    })



  }

  ngOnInit() {



  }

  retrieveRequests() {
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present()
      this.load = loader;
    });

    this.apiSvc.getTravelRequest(this.id).then(res => {
      console.log(res)
    })
      // let body = `action=${encodeURIComponent("ViewTravelRequest")}` +
      //   `&corp=${encodeURIComponent(this.id)}`;
      ;
  }

  viewRequest(details) {

    let navParams: NavigationExtras = {
      state: {
        data: details
      }
    }

    this.router.navigate(['/single-travel-request'], navParams);
  }

}
