import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx'
import { NavController, LoadingController } from '@ionic/angular';
import { Defaults } from '../objects';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-ambassador-partners',
  templateUrl: './ambassador-partners.page.html',
  styleUrls: ['./ambassador-partners.page.scss'],
})
export class AmbassadorPartnersPage implements OnInit {
  Defaults_: Defaults = new Defaults();
  vps = Array<Ambassador>();
  options;
  hasAccount = false;
  constructor(
    private sqlSvc: SqliteService,
    private router: Router,
    private http: Http,
    private loadCtrl: LoadingController,
    private nativeHttp: HTTP,
    private sanitizer: DomSanitizer,
    private authSvc:AuthenticationService
  ) {

  }

  ngOnInit() {
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present();
      this.authSvc.authState.subscribe(val => {
        if(val){
          this.hasAccount = val;
          this.sqlSvc.getAmbassadorsData({ title: 'VP' }).then(val => {
            // val = val.filter(row => {
            //   return row.IRID !== '0000000';
            // });
            for (let i = 0; i < val.length; i++) {
              let a = new Ambassador();
              a.fromJson(val.item(i));
    
              // do something with it
    
              this.vps.push(a);
              // }
              // this.corporate = holder;
            }
    
            // console.log(val.json())
            // this.vps = val.json();
            // val['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(val['Image'])
    
            // console.log(this.vps)
          })
    
          loader.dismiss();
        }
        else{
          this.hasAccount = val;
          loader.dismiss();
        }
        
      });
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
