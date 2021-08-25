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
  votes;
  constructor(public navCtrl: NavController,
    private http: HttpClient,
    private storage: Storage,
    private alertCtrl: AlertController,
    private aroute: ActivatedRoute,
    private router: Router) {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.profile = this.router.getCurrentNavigation().extras.state.data;
        let holder = this.profile
        delete holder['Image']
        delete holder['CandidateID']
        delete holder['Total']


        Object.keys(holder).forEach((key) => (holder[key] == "") && delete holder[key]);
        this.votes = Object.entries(this.profile)
        this.votes = this.votes.slice(4, this.votes.length)

        // let holder = this.votes;
        // delete holder.CandidateID
        // delete holder.IRID
        // delete holder.Name
        // delete holder.Team

        console.log(this.votes)
      }
    })
  }

  ngOnInit() {

  }

}
