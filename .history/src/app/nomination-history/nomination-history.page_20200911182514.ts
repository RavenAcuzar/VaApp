import { Component, OnInit } from '@angular/core';
import { Defaults } from '../objects';
import { Nominee } from '../../models/nominee.model';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-nomination-history',
  templateUrl: './nomination-history.page.html',
  styleUrls: ['./nomination-history.page.scss'],
})
export class NominationHistoryPage implements OnInit {

  nominees;
  viewList: []
  Defaults_: Defaults = new Defaults();

  type: string = 'VP';
  constructor(public navCtrl: NavController,
    private aroute: ActivatedRoute,
    private router: Router) {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nominees = this.router.getCurrentNavigation().extras.state.data;
        this.viewList = this.nominees;
        // this.changeView();
        // this.category = this.router.getCurrentNavigation().extras.state.category;
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

  viewProfile(person: Nominee) {
    let navParams: NavigationExtras = {
      state: {
        data: person
      }
    }
    this.router.navigate(['/nomination-history-profile'], navParams);
  }
}
