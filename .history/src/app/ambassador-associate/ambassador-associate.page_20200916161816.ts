import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx'
import { Defaults } from '../objects';


@Component({
  selector: 'app-ambassador-associate',
  templateUrl: './ambassador-associate.page.html',
  styleUrls: ['./ambassador-associate.page.scss'],
})
export class AmbassadorAssociatePage implements OnInit {
  avps = Array<Ambassador>();
	Defaults_: Defaults = new Defaults();

  constructor(
    private sqlSvc: SqliteService,
    private router: Router,
    private arouter: ActivatedRoute,
    private http: Http,
    private nativeHttp: HTTP,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({ title: 'AVP' }).then(val => {
      // for (let i = 0; i < val.length; i++) {
      //   let item = val.item(i);
      //   // do something with it

      //   this.avps.push(item);
      // }
      this.avps = val;
      this.avps.forEach(item => {
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

        console.log(item['imgUrl'])
        // console.log(item)
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
