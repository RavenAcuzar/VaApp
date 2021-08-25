import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';

@Component({
  selector: 'app-ambassador-partners',
  templateUrl: './ambassador-partners.page.html',
  styleUrls: ['./ambassador-partners.page.scss'],
})
export class AmbassadorPartnersPage implements OnInit {
  vps = Array<Ambassador>();
  constructor(
    private sqlSvc: SqliteService
  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({title:'VP'}).then(val=>{
      this.vps = val;
    })
  }

}
