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
  today;
  constructor(
    private datePicker: DatePicker,
    private datePipe: DatePipe
  ) {
    this.today = new Date().toISOString();

  }

  ngOnInit() {
  }

  selectFromDate() {
    // var opts = {
    //   date: new Date(),
    //   mode: 'date',
    //   // androidTheme
    // }
    // let date = new Date();
    this.fromDate = this.datePipe.transform(this.fromDate, "yyyy-MM-dd")
    // this.fromDate = (new Date(this.fromDate)).toDateString();

    console.log(this.fromDate)

    // this.datePicker.show(opts).then((selectedDate) => {
    //   this.fromDate = this.datePipe.transform(selectedDate, "yyyy-MM-dd")
    //   console.log(this.fromDate + " 00:00:00")
    // })

  }

  selectEndDate() {
    // var opts = {
    //   date: new Date(),
    //   mode: 'date',
    //   // androidTheme
    // }
    // let date = new Date();
    this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd")
    // this.fromDate = (new Date(this.fromDate)).toDateString();

    console.log(this.endDate)

    // this.datePicker.show(opts).then((selectedDate) => {
    //   this.fromDate = this.datePipe.transform(selectedDate, "yyyy-MM-dd")
    //   console.log(this.fromDate + " 00:00:00")
    // })

  }
}
