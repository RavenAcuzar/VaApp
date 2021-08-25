import { Component, OnInit } from '@angular/core';
import { Ambassador } from '../../models/ambassador.model';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-ambassador-associate',
  templateUrl: './ambassador-associate.page.html',
  styleUrls: ['./ambassador-associate.page.scss'],
})
export class AmbassadorAssociatePage implements OnInit {
  avps = Array<Ambassador>();
  constructor(
    private sqlSvc:SqliteService
  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({title:'AVP'}).then(val=>{
      for (let i = 0; i < val.length; i++) {
        let item = val.item(i);
        // do something with it

        this.avps.push(item);
      }
      this.avps = val;
    });
  }

}
