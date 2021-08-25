import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import { TravelRequest } from '../../models/travel-request.model'
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-travel-send-request',
  templateUrl: './travel-send-request.page.html',
  styleUrls: ['./travel-send-request.page.scss'],
})
export class TravelSendRequestPage implements OnInit {
  id: string;
  requests: any;
  options: any;
  load: any;
  requestList = [];
  travelRequest = TravelRequest;
  user: User;

  today;

  constructor(public navCtrl: NavController,
    private http: Http,
    private loadCtrl: LoadingController,
    private aroute: ActivatedRoute,
    private storage: Storage,
    private datePipe: DatePipe,
    private router: Router) {

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    let request = new TravelRequest;
    this.requestList.push(request)
    this.today = new Date().toISOString();

    this.storage.get("user")
      .then((val: User) => {
        if (val == undefined || val == null) {
          //   this.sqlite.create({
          //     name: "vapp.db",
          //     location: "default"
          //   }).then((db: SQLiteObject) => {
          //     db.executeSql("select * from UserData", [])
          //       .then((val) => {
          //         if (val.rows.length > 0) {
          //           this.kind = val.rows.item(0).Keynum == 9;

          //           let user = new User();
          //           user.fromJson(val.rows.item(0), this.kind);

          //           this.storage.set("user", user);
          //           LoginEvents.stateChanged(this.event);

          //           this.hasAccount = true;
          //           this.isSuperuser = user.Type;
          //         }
          //       })
          //       .catch((err) => console.log(err));
          //   });

          this.user = null;
          this.navCtrl.navigateRoot(['/'])
        }

        else {
          this.user = val;
          console.log(this.user)
        }
      });


  }

  ngOnInit() {
    // this.aroute.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     console.log(this.router.getCurrentNavigation().extras.state.data.ID)
    //     console.log(this.router.getCurrentNavigation().extras.state.data["ID"])
    //     this.id = this.router.getCurrentNavigation().extras.state.data["ID"];
    //   }
    // })

    // this.retrieveRequests();

  }

  // retrieveRequests() {
  //   this.loadCtrl.create({
  //     spinner: "crescent",
  //     message: "Loading..."
  //   }).then(loader => {
  //     loader.present()
  //     this.load = loader;
  //   });

  //   // let body = `action=${encodeURIComponent("ViewTravelRequest")}` +
  //   //   `&corp=${encodeURIComponent(this.id)}`;
  //   let body = new URLSearchParams();
  //   body.set('action', 'ViewTravelRequest');
  //   body.set('corp', this.id);



  //   this.http.post("https://vaservice.the-v.net/site.aspx",
  //     body,
  //     this.options)
  //     .subscribe(
  //       res => {
  //         console.log(res)
  //         this.requests = res.json();
  //         this.load.dismiss();
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  // }

  addRequest() {
    let request = new TravelRequest;
    this.requestList.push(request);

    console.log(this.requestList)
  }

  removeRequest(i) {
    this.requestList.splice(i, 1)
  }

  sendRequests() {
    //StartDate mm/dd/yy
    //EndDate mm/dd/yy
    //Ambassador ID
    //CratedOn Today
    //CreatedBy Name
    //Status?
    this.requestList.forEach(item => {
      // console.log(item)
      // item.startDate = new Date(item.startDate)
      // console.log(item.StartDate)
      console.log(this.datePipe.transform(item.StartDate, "MM/dd/yy"))
      item.StartDate = this.datePipe.transform(item.StartDate, "MM/dd/yy")
      // item.endDate = new Date(item.endDate)
      item.EndDate = this.datePipe.transform(item.EndDate, "MM/dd/yy")
      item.CreatedOn = new Date().toISOString();
      item.id = this.user.ID;
      item.CreatedBy = this.user.Name;
      item.Destination = item.Destination;
    })

    for (let i = 0; i < this.requestList.length; i++) {
      let body = JSON.stringify(this.requestList[i])
      this.http.post('http://localhost:8080/travelRequest', { data: body }, this.options).subscribe(res => {
        console.log(res)
      }, error => {
        console.log(error)
      })
    }
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
