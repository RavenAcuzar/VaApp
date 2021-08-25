import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';

@Component({
  selector: 'app-ambassador-council',
  templateUrl: './ambassador-council.page.html',
  styleUrls: ['./ambassador-council.page.scss'],
})
export class AmbassadorCouncilPage implements OnInit {
  vcs=Array<Ambassador>();
  constructor(
    private sqlSvc:SqliteService
  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({title:'VC'}).then(val=>{
      this.vcs = val;
    })
  }

}
