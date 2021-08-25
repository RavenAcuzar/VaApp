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
      // for (let i = 0; i < val.length; i++) {
      //   let item = val.item(i);
      //   // do something with it

      //   this.vps.push(item);
      // }
      this.vps = val;
      this.vps.forEach(item => {
        item['imgUrl'] = item['imgUrl'].replace('www.the-v.net', 'site.the-v.net')
        console.log(item)
      })
      console.log(this.vps)
    })
  }

  moveToLanding(partner) {
    console.log(partner)

    let navParams: NavigationExtras = {
      state: {
        data: partner,
        id: partner.id
      }
    }
    // this.navCtrl.navigateForward(['/profile'], navParams);

    this.router.navigate(['/ambassador-profile'], navParams);
  }

}
