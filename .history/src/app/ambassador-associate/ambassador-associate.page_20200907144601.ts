import { Component, OnInit } from '@angular/core';
import { Ambassador } from '../../models/ambassador.model';
import { SqliteService } from '../services/sqlite.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-ambassador-associate',
  templateUrl: './ambassador-associate.page.html',
  styleUrls: ['./ambassador-associate.page.scss'],
})
export class AmbassadorAssociatePage implements OnInit {
  avps = Array<Ambassador>();
  constructor(
    private sqlSvc: SqliteService,
    private router: Router,
    private arouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({ title: 'AVP' }).then(val => {
      for (let i = 0; i < val.length; i++) {
        let item = val.item(i);
        // do something with it

        this.avps.push(item);
      }
      // this.avps = val;
    });
  }

  moveToLanding(partner) {
    console.log(partner)

    let navParams: NavigationExtras = {
      state: {
        data: partner
      }
    }
    // this.navCtrl.navigateForward(['/profile'], navParams);

    this.router.navigate(['/ambassador-profile'], navParams);
  }

}
