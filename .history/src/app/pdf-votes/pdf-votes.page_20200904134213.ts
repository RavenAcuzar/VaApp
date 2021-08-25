import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { DatePicker } from '@ionic-native/date-picker/ngx'
import { DatePipe } from '@angular/common'
import { Platform, NavController, LoadingController, Events, AlertController, IonRouterOutlet } from '@ionic/angular';

import pdfMake from 'pdfmake/build/pdfMake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
// import { table } from 'console';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pdf-votes',
  templateUrl: './pdf-votes.page.html',
  styleUrls: ['./pdf-votes.page.scss'],
})
export class PdfVotesPage implements OnInit {

  pdfSrc = null;
  fromDate: string = '';
  endDate: string = '';

  currentPage = 1;
  resultsPerPage = 10;
  totalPages = 10;
  resultTable = [];
  viewTable = [];
  today;
  constructor(
    private http: Http,
    private datePicker: DatePicker,
    private datePipe: DatePipe,
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {
    this.today = new Date().toISOString();

  }

  ngOnInit() {
    this.http.get('http://localhost:8080/votePageCount').subscribe(res => {
      if (res.json() <= 3) {
        this.http.get('http://localhost:8080/votePageCountIncrease').subscribe(res => {

        })
      }
      else {
        this.alertCtrl.create({
          header: 'Warning',
          message: 'Only a limited number of slots are available for page viewing, please wait for a slot to become available',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.navCtrl.back()
              }
            }
          ]
        }).then(loader => {
          loader.present();
          loader.onWillDismiss().then(() => {
            this.navCtrl.back();
          })
        })


      }
    })
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
    let endDate = this.endDate + " 00:00:00";

    console.log(fromDate)
    console.log(endDate)

    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present();

      this.http.get("http://localhost:8080/getVotes?dateFrom=" + fromDate + "&dateEnd=" + endDate
        // body,
        // this.options
      ).subscribe(res => {
        let result = res.json()
        this.resultTable = result;

        this.totalPages = Math.ceil((this.resultTable.length / this.resultsPerPage))
        this.generateTableView();
        console.log(result)
        loader.dismiss();

        this.generatePDF(result)
      }, error => {
        loader.dismiss();
        console.log(error)
      })

    })

  }

  generateTableView() {
    let startIndex = (this.currentPage * this.resultsPerPage) - this.resultsPerPage;
    let endIndex = (this.currentPage * this.resultsPerPage)
    this.viewTable = this.resultTable.slice(startIndex, endIndex)

  }
  generateVoteTable(data, cols) {
    var voteTable = [];

    voteTable.push(cols);

    data.forEach(function (rows) {
      let voteTableRow = [];

      cols.forEach(function (column) {
        voteTableRow.push(rows[column].toString())
      })
      voteTable.push(voteTableRow)
    })

    return (voteTable)
  }

  generatePDF(data) {
    console.log(data)
    let votes = data;

    var docdef = {
      content: [
        {
          text: 'Tallied Votes', style: 'header',

          table: {
            headerRows: 1,
            widths: ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'],

            body: this.generateVoteTable(votes, Object.keys(votes[0]))
          }
        },

      ]
    }

    this.pdfSrc = pdfMake.createPdf(docdef)
    if (this.platform.is('cordova')) {
      //if mobile
    } else {
      this.pdfSrc.download();
    }
  }

  nextPage() {
    this.currentPage++;
    this.generateTableView()
  }

  previousPage() {
    this.currentPage--;
    this.generateTableView()

  }

  firstPage() {
    this.currentPage = 1;
    this.generateTableView()

  }

  lastPage() {
    this.currentPage = this.totalPages - 1;
    this.generateTableView()

  }
}
