import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx'
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-ambassador-partners',
  templateUrl: './ambassador-partners.page.html',
  styleUrls: ['./ambassador-partners.page.scss'],
})
export class AmbassadorPartnersPage implements OnInit {
  vps = Array<Ambassador>();
  options;
  constructor(
    private sqlSvc: SqliteService,
    private router: Router,
    private http: Http,
    private loadCtrl: LoadingController,
    private nativeHttp: HTTP,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present();
      this.sqlSvc.getAmbassadorsData({ title: 'VP' }).then(val => {
        // val = val.filter(row => {
        //   return row.IRID !== '0000000';
        // });
        console.log(val)
        this.vps = val;
        // val['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(val['Image'])

        loader.dismiss();
        // console.log(this.vps)
      })
    });

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
