import { Component, OnInit } from '@angular/core';


import { Defaults } from '../objects';
import { Ambassador } from '../../models/ambassador.model';

import { NavController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-ambassador-profile',
  templateUrl: './ambassador-profile.page.html',
  styleUrls: ['./ambassador-profile.page.scss'],
})
export class AmbassadorProfilePage implements OnInit {
  // content: Ambassador;
  // Defaults_: Defaults = new Defaults();
  ambassador = new Ambassador();
  isFounder: boolean = false;
  isPartner: boolean = false;
  isAssociatePartner: boolean = true;
  isCouncil: boolean = false;

  constructor(private aroute: ActivatedRoute,
    private router: Router,
    private sqlSvc: SqliteService) {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.ambassador = this.router.getCurrentNavigation().extras.state.data;

        console.log(this.ambassador.ID)
        this.sqlSvc.getAmbassadorsData({ id: this.ambassador.ID }).then(val => {
          console.log(val)
          this.ambassador = val[0];
          switch (val[0].Title) {
            case 'VF':
              this.isFounder = true;
              break;
            case 'VP':
              this.isPartner = true;
              break;
            case 'AVP':
              this.isAssociatePartner = true;
              break;
            case 'VC': //possible removal if not needed
              this.isCouncil = true;
              break;
          }
        })
      }
    })

  }

  ngOnInit() {
    this.aroute.params.subscribe(params => {

    })
  }

}
