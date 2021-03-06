import { Component, OnInit } from '@angular/core';


import { Defaults } from '../objects';
import { Ambassador } from '../../models/ambassador.model';

import { NavController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http/ngx'
import { Storage } from '@ionic/storage';
import { User } from 'src/models/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-ambassador-profile',
  templateUrl: './ambassador-profile.page.html',
  styleUrls: ['./ambassador-profile.page.scss'],
})
export class AmbassadorProfilePage implements OnInit {
  // content: Ambassador;
  // Defaults_: Defaults = new Defaults();
  ambassador;
  isFounder: boolean = false;
  isPartner: boolean = false;
  isAssociatePartner: boolean = false;
  isCouncil: boolean = false;
  Defaults_: Defaults = new Defaults();
  fromSearch: boolean;
  hideIRID=true;

  constructor(private aroute: ActivatedRoute,
    private router: Router,
    private sqlSvc: SqliteService,
    private nativeHttp: HTTP,
    private sanitizer: DomSanitizer,
    private storage:Storage,
    private authSvc:AuthenticationService) {
      
      this.authSvc.getUser()
			.then((val: User) => {
				console.log(val);
				if(val.Department === 'GLAD' || (val.Type && val.Class) )
          this.hideIRID = false;
      });

    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.ambassador = (this.router.getCurrentNavigation().extras.state.data);
        this.fromSearch = (this.router.getCurrentNavigation().extras.state.fromSearch);
        console.log(this.fromSearch)
        // if (this.fromSearch) {
        //   let a = new Ambassador();
        //   this.ambassador = a.fromJson(this.ambassador);
        // }
          //if (this.ambassador['imgUrl'].includes('www.the-v.net')) this.ambassador['imgUrl'] = this.ambassador['imgUrl'].replace('www.the-v.net', 'site.the-v.net')
          //else if (this.ambassador['imgUrl'].includes('http://the-v.net')) this.ambassador['imgUrl'] = this.ambassador['imgUrl'].replace('http://the-v.net', 'http://site.the-v.net')


          //NATIVE BEFORE
          // let reader = new FileReader();
          // this.nativeHttp.sendRequest(this.ambassador['imgUrl'], { method: 'get', responseType: 'blob', data: {}, headers: {} })
          //   .then(result => {
          //     let data;
          //     reader.readAsDataURL(result.data);
          //     reader.onloadend = () => {
          //       data = reader.result
          //       // data = "data:image/jpeg;base64," + data;
          //       // this.ambassador['imgUrl'] = data
          //       this.ambassador['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(data)

          //     }
          //   }, error => {
          //     console.log(error)
          //   })
        //}
       
        // this.sqlSvc.getAmbassadorsData({ id: this.ambassador.ID }).then(val => {
        //   console.log(val)
        // this.ambassador = val[0];
        console.log(this.ambassador)

        switch (this.ambassador.Title) {
          case 'VF':
            this.isFounder = true;
            if (this.ambassador.Rank == '1') this.ambassador.Image = '../../assets/dataprof.png'
            else this.ambassador.Image = '../../assets/japaprof.png'
            console.log(this.ambassador)
            break;
          case 'VP':
            this.isPartner = true;
            break;
          case 'AVP':
            this.isAssociatePartner = true;
            break;
          case 'VC': //possible removal if not needed
            this.isCouncil = true;
            break;
        }
        // })
      }
    })

  }

  ngOnInit() {
    this.aroute.params.subscribe(params => {

    })
  }

  imageError() {
    this.ambassador.Image = '../../assets/profile.png'
  }
}
