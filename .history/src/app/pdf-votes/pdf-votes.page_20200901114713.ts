import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx'
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-pdf-votes',
  templateUrl: './pdf-votes.page.html',
  styleUrls: ['./pdf-votes.page.scss'],
})
export class PdfVotesPage implements OnInit {

  fromDate: string = '';
  endDate: string = '';
  constructor(
    private datePicker: DatePicker,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }

  selectFromDate() {
    // var opts = {
    //   date: new Date(),
    //   mode: 'date',
    //   // androidTheme
    // }

    // this.datePicker.show(opts).then((selectedDate) => {
    //   this.fromDate = this.datePipe.transform(selectedDate, "yyyy-MM-dd")
    //   console.log(this.fromDate + " 00:00:00")
    // })
    
  }
}
