import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-single-travel-request',
  templateUrl: './single-travel-request.page.html',
  styleUrls: ['./single-travel-request.page.scss'],
})
export class SingleTravelRequestPage implements OnInit {
  details: any;

  constructor(private aroute: ActivatedRoute,
    private router: Router) {
      this.aroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.details = this.router.getCurrentNavigation().extras.state.data;
        }
      })
     }

  ngOnInit() {
  }

}
