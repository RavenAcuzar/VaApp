import { Component, OnInit, Optional } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Defaults } from '../objects';
import { User } from '../../models/user.model';
import { Ambassador } from '../../models/ambassador.model';
import { NavController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-ambassador-contact',
  templateUrl: './ambassador-contact.page.html',
  styleUrls: ['./ambassador-contact.page.scss'],
})
export class AmbassadorContactPage implements OnInit {

  content: Ambassador;
  isSuperuser: boolean = false;
  Defaults_: Defaults = new Defaults();
  noUser: boolean;
  hideIRID=true;

  constructor(
    @Optional() private ionRoute: IonRouterOutlet,
    private navCtrl: NavController,
    private aroute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private authSvc:AuthenticationService) {

      this.authSvc.getUser()
			.then((val: User) => {
				console.log(val);
				if(val.Department === 'GLAD' || (val.Type && val.Class) )
          this.hideIRID = false;
      });
  }

  ngOnInit() {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.content = this.router.getCurrentNavigation().extras.state.data;
      }
    })

  }

  edit() {
    let navParams: NavigationExtras = {
      state: {
        data: this.content
      }
    }

    this.navCtrl.navigateForward(['/edit-va'], navParams);
  }
}
