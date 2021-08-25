import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx'


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
    private nativeHttp: HTTP,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({ title: 'VP' }).then(val => {
      // val = val.filter(row => {
      //   return row.IRID !== '0000000';
      // });
      console.log(val)
      this.vps = val;
      this.vps.forEach(item => {
        if (item['imgUrl'].includes('www.the-v.net')) item['imgUrl'] = item['imgUrl'].replace('www.the-v.net', 'site.the-v.net')
        else if (item['imgUrl'].includes('http://the-v.net')) item['imgUrl'] = item['imgUrl'].replace('http://the-v.net', 'http://site.the-v.net')


        let reader = new FileReader();
        this.nativeHttp.sendRequest(item['imgUrl'], { method: 'get', responseType: 'blob', data: {}, headers: {} })
          .then(result => {
            let data;
            reader.readAsDataURL(result.data);
            reader.onloadend = () => {
              data = reader.result
              // data = "data:image/jpeg;base64," + data;
              item['imgUrl'] = data
              item['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(item['imgUrl'])

            }
          }, error => {
            console.log(error)
          })

        // console.log(item)
      })
      // console.log(this.vps)
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
