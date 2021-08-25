import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController } from '@ionic/angular';

import { User } from '../../models/user.model';
import { Defaults } from '../objects';
import { Nominee } from '../../models/nominee.model';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-nomination-history-profile',
  templateUrl: './nomination-history-profile.page.html',
  styleUrls: ['./nomination-history-profile.page.scss'],
})
export class NominationHistoryProfilePage implements OnInit {

  Defaults_: Defaults = new Defaults();
  profile;
  year;
  month;
  votes;
  hideIRID = true;

  constructor(public navCtrl: NavController,
    private http: HttpClient,
    private storage: Storage,
    private alertCtrl: AlertController,
    private aroute: ActivatedRoute,
    private router: Router) {
    this.aroute.queryParams.subscribe(params => {

      this.storage.get("user")
      .then((val: User) => {
        if (val != undefined && Object.keys(val).length > 0) {
          if(val.Department === 'GLAD' || (val.Type && val.Class) )
            this.hideIRID = false;
        }
        else {
          this.hideIRID = true;
        }
      })
      .catch(err => console.log(err));

      if (this.router.getCurrentNavigation().extras.state) {
        this.profile = this.router.getCurrentNavigation().extras.state.data;
        this.year = this.router.getCurrentNavigation().extras.state.year;
        this.month = this.router.getCurrentNavigation().extras.state.month;

        // let holder = this.profile
        // delete holder['Image']
        // delete holder['CandidateID']
        // delete holder['Total']


        Object.keys(this.profile).forEach((key) => (this.profile[key] == "" && key!="Total") && delete this.profile[key]);
        this.votes = Object.entries(this.profile)
        this.votes = this.votes.slice(4, (this.votes.length - 1))

        // let holder = this.votes;
        // delete holder.CandidateID
        // delete holder.IRID
        // delete holder.Name
        // delete holder.Team
        console.log(Object.entries(this.profile));
        console.log(this.votes)
      }
    })
  }

  ngOnInit() {

  }

}
