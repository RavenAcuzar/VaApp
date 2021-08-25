import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ambassador-council',
  templateUrl: './ambassador-council.page.html',
  styleUrls: ['./ambassador-council.page.scss'],
})
export class AmbassadorCouncilPage implements OnInit {
  vcs = Array<Ambassador>();
  constructor(
    private sqlSvc: SqliteService,
    private router: Router

  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({ title: 'VC' }).then(val => {
      this.vcs = val;
    })
  }

  moveToLanding(partner) {
    console.log(partner)

    let navParams: NavigationExtras = {
      state: {
        data: partner
      }
    }
    // this.navCtrl.navigateForward(['/profile'], navParams);

    this.router.navigate(['/partner-landing'], navParams);
  }

}
