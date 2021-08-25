import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
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
    private http: Http,
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

  getVotes() {
    let fromDate = this.fromDate + " 00:00:00";
    let endDate = this.endDate + + " 00:00:00";

    this.http.get("http://localhost:8080/getVotes?dateFrom=" + fromDate + "&dateEnd=" + endDate
      // body,
      // this.options
    ).subscribe(res => {
      let result = res.json()
      console.log(result)
    }, error => {
      console.log(error)
    })

  }
}
