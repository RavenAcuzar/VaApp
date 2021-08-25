import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

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
  type;
  isStatusDisabled: boolean = true;
  constructor(public navCtrl: NavController,
    private http: Http,
    private loadCtrl: LoadingController,
    private apiSvc: ApiService,
    private aroute: ActivatedRoute,
    private router: Router,
    private alrtCtrl: AlertController,
    private authenticationService: AuthenticationService) {

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });


    // this.aroute.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.user = this.router.getCurrentNavigation().extras.state.data;
    //     this.id = this.user.ID
    //     this.type = this.user.Type;
    //     this.retrieveRequests();

    //   }
    // })

    this.authenticationService.getUser().then(user => {
      console.log(user)
      this.user = user
      this.id = this.user.ID
      this.type = this.user.Type;
      this.retrieveRequests();

      // this.isStatusDisabled = (!this.user.Class)
      if (this.user.Type == 'Poweruser') {
        this.isStatusDisabled = false;
      }
      if (this.user.hasOwnProperty('Department') && this.requests.length != 0) {
        this.isStatusDisabled = false
      }
    });


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

      this.apiSvc.getTravelRequest(this.id).then(res => {
        // console.log(res)
        // console.log(res.body.json())
        // res.map(item =>)
        // let holder = res;
        // holder.forEach(item =>{

        // })

        this.requests = res.json();
        console.log(this.requests)
        // this.requests = this.requests.filter(item => {
        //   return item.Name == this.user.Name
        // })
        loader.dismiss();
      })
    });


    // let body = `action=${encodeURIComponent("ViewTravelRequest")}` +
    //   `&corp=${encodeURIComponent(this.id)}`;
  }

  viewRequest(details) {

    let navParams: NavigationExtras = {
      state: {
        data: details
      }
    }

    this.router.navigate(['/single-travel-request'], navParams);
  }

  selectChange(id, status) {
    console.log(id + " qqq " + status)
    this.alrtCtrl.create({
      header: "Change Status",
      subHeader: "Confirm Status Change?",
      buttons: [
        {
          text: "No"
        },
        {
          text: "Yes",
          handler: () => {
            // console.log('yes')
            this.updateTravelRequest(id, status)
          }
        }
      ]
    }).then(alert => alert.present());
  }

  updateTravelRequest(id, status) {
    this.apiSvc.updateTravelStatus(this.user.Name, id, status).then(res => {
      let result = res['_body']
      if (res == 'error') {
        this.messagePromt("Error", "Oops! Something went wrong! Please Try again.");

      }
      if (result == "True") {
        this.messagePromt("Success", "Password reset request sent! Kindly check your email.");
      }

      else {
        this.messagePromt("Error", "Sorry! But it seems you don't have an account yet.");
      }
      this.load.dismiss()
    })


  }

  messagePromt(head: string, message: string) {
    this.alrtCtrl.create({
      header: head,
      subHeader: message,
      buttons: ["OK"]
    }).then(alert => alert.present());
  }
}
