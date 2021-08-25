import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx'
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ambassador-council',
  templateUrl: './ambassador-council.page.html',
  styleUrls: ['./ambassador-council.page.scss'],
})
export class AmbassadorCouncilPage implements OnInit {
  vcs = Array<Ambassador>();
  constructor(
    private sqlSvc: SqliteService,
    private router: Router,
    private http: Http,
    private loadCtrl: LoadingController,

    private nativeHttp: HTTP,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present();
      this.sqlSvc.getAmbassadorsData({ title: 'VC' }).then(val => {
        console.log(val)
        // for (let i = 0; i < val.length; i++) {
        //   let item = val.item(i);
        //   // do something with it

        //   this.vcs.push(item);
        // }
        this.vcs = val;
        loader.dismiss();
        // this.vcs.forEach(item => {
        //   if (item['imgUrl'].includes('www.the-v.net')) item['imgUrl'] = item['imgUrl'].replace('www.the-v.net', 'site.the-v.net')
        //   else if (item['imgUrl'].includes('http://the-v.net')) item['imgUrl'] = item['imgUrl'].replace('http://the-v.net', 'http://site.the-v.net')


        //   let reader = new FileReader();
        //   this.nativeHttp.sendRequest(item['imgUrl'], { method: 'get', responseType: 'blob', data: {}, headers: {} })
        //     .then(result => {
        //       let data;
        //       reader.readAsDataURL(result.data);
        //       reader.onloadend = () => {
        //         data = reader.result
        //         // data = "data:image/jpeg;base64," + data;
        //         item['imgUrl'] = data
        //         item['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(item['imgUrl'])

        //       }
        //     }, error => {
        //       console.log(error)
        //     })

        //   console.log(item['imgUrl'])
        //   // console.log(item)
        // })
      })
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
