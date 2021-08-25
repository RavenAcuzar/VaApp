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
      this.avps = val;
    });
  }

}
