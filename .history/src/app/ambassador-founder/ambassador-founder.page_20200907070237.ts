import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Ambassador } from '../../models/ambassador.model';

@Component({
  selector: 'app-ambassador-founder',
  templateUrl: './ambassador-founder.page.html',
  styleUrls: ['./ambassador-founder.page.scss'],
})
export class AmbassadorFounderPage implements OnInit {
  //founders = Array<Ambassador>();
  dato=new Ambassador();
  japa=new Ambassador();
  constructor(
    private sqlSvc:SqliteService,
  ) { }

  ngOnInit() {
    this.sqlSvc.getAmbassadorsData({title:'VF'}).then(val=>{
      val.forEach(am=>{
        if(am.Rank==='1')
          this.dato = am;
        else if(am.Rank ==='2')
          this.japa = am;
      })
    })
  }

}
