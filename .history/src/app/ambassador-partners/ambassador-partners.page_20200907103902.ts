import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ambassador-partners',
  templateUrl: './ambassador-partners.page.html',
  styleUrls: ['./ambassador-partners.page.scss'],
})
export class AmbassadorPartnersPage implements OnInit {
  vps = Array<Ambassador>();
  constructor(
    private sqlSvc: SqliteService,
    private router: Router

  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({ title: 'VP' }).then(val => {
      this.vps = val;
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
