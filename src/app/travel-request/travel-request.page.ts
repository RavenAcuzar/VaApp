import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Events } from '@ionic/angular';
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
  upcomingRequests = [];
  pastRequests = [];
  options: any;
  load: any;
  user;
  type;
  isStatusDisabled: boolean = true;
  tType = 'upcoming';
  constructor(public navCtrl: NavController,
    private http: Http,
    private loadCtrl: LoadingController,
    private apiSvc: ApiService,
    private aroute: ActivatedRoute,
    private router: Router,
    private alrtCtrl: AlertController,
    private authenticationService: AuthenticationService,
    private events:Events,
    private cdr: ChangeDetectorRef) {

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    this.retrieveRequests();
    // this.aroute.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.user = this.router.getCurrentNavigation().extras.state.data;
    //     this.id = this.user.ID
    //     this.type = this.user.Type;
    //     this.retrieveRequests();

    //   }
    // })

    


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
      this.authenticationService.getUser().then(user => {
        console.log(user)
        this.user = user
        this.id = this.user.ID
        this.type = this.user.Type;
        
  
        // this.isStatusDisabled = (!this.user.Class)
        if (this.user.Type == 'Poweruser') {
          this.isStatusDisabled = false;
        }
        if (this.user.hasOwnProperty('Department') && (this.pastRequests.length != 0 || this.upcomingRequests.length!=0)) {
          this.isStatusDisabled = false
        }
        this.apiSvc.getTravelRequest(this.id).then(res => {
          // console.log(res)
          // console.log(res.body.json())
          // res.map(item =>)
          // let holder = res;
          // holder.forEach(item =>{
  
          // })
          this.upcomingRequests = [];
          this.pastRequests=[];
          let r = res.json();
          let now = new Date();
          r.forEach(e => {
            if(new Date(e.StartDate) >= now){
              this.upcomingRequests.push(e);
            } else {
              this.pastRequests.push(e);
            }
          });
          this.cdr.detectChanges();
          //console.log(this.requests)
          // this.requests = this.requests.filter(item => {
          //   return item.Name == this.user.Name
          // })
          loader.dismiss();
        })
      });

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

  selectChange(tr) {
    //console.log(id + " qqq " + status)
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
            this.updateTravelRequest(tr)
          }
        }
      ]
    }).then(alert => alert.present());
  }
  goToCreateTravel(){
    
    this.events.subscribe('user:updated', (updatedData) => {
      // do something when updated data
      console.log(updatedData);
      this.retrieveRequests();
  });

  // event subscription to keep track of your 'state'. Here you'll 'unsubscribe' when done
  this.events.subscribe('returnedFromEdit', () => {
      this.events.unsubscribe('user:updated');
      this.events.unsubscribe('returnedFromEdit');
  });

  this.router.navigate(['/create-travel-request']);
  }
  updateTravelRequest(tr) {
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present();
    
    this.apiSvc.updateTravelStatus(this.user.Name, tr).then(res => {
      let result = res;
      if (result == 'error') {
        this.messagePromt("Error", "Oops! Something went wrong! Please Try again.");

      }
      if (result == "True") {
        this.messagePromt("Success", "Travel Request status updated successfully.");
      }

      else {
        this.messagePromt("Error", "Sorry! Status update failed.");
      }
      loader.dismiss()
    })

  });
  }

  messagePromt(head: string, message: string) {
    this.alrtCtrl.create({
      header: head,
      subHeader: message,
      buttons: ["OK"]
    }).then(alert => alert.present());
  }
}
