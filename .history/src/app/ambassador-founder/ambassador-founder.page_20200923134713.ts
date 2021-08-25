import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ambassador-founder',
  templateUrl: './ambassador-founder.page.html',
  styleUrls: ['./ambassador-founder.page.scss'],
})
export class AmbassadorFounderPage implements OnInit {
  //founders = Array<Ambassador>();
  dato = new Ambassador();
  japa = new Ambassador();
  constructor(
    private sqlSvc: SqliteService,
    private router: Router

  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({ title: 'VF' }).then(val => {
      // for (let i = 0; i < val.length; i++) {
      //   let item = val.item(i);
      //   // do something with it

      //   if (item.Rank === '1')
      //     this.dato = item;
      //   else if (item.Rank === '2')
      //     this.japa = item;
      //   // this.corporate.push(item);
      // }
      // console.log(val.json())
      console.log(val.item(1))
      for (let i = 0; i < val.length; i++) {
        let item = val.item(i);
        // do something with it

        // this.corporate.push(item);
        // }
        // this.corporate = holder;
        if (item(i).Rank == '1') {
          this.dato = item(i)
        }
        else if (item(i).Rank == '2') {
          this.japa = item(i)
        }
      }

      //   val.forEach(am => {
      //     if (am.Rank === '1') {
      //       this.dato = am;
      //       console.log(this.dato)
      //     }
      //     else if (am.Rank === '2')
      //       this.japa = am;
      //   })
      // })
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
