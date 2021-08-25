import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { DatePicker } from '@ionic-native/date-picker/ngx'
import { DatePipe } from '@angular/common'
import { Platform, NavController, LoadingController, Events, AlertController, IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { File } from '@ionic-native/file/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx'

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

  yearList: any[] = [];
  monthList: any[] = [];
  selectedYear: string = '';
  selectedMonth: string = '';
  enableMonth: boolean = false;
  dataRetrieved: boolean = false;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  resultTable = [];
  historyList = [];
  candidates = [];
  today;
  category: string = '';
  options;
  constructor(
    private http: Http,
    private router: Router,
    private datePicker: DatePicker,
    private datePipe: DatePipe,
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private file: File,
    private aroute: ActivatedRoute,
    private fileOpener: FileOpener,
    private platform: Platform
  ) {
    this.today = new Date().toISOString();
    // if (this.yearList) console.log("Empty")

    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.data;
        if (this.category == "VCs") this.category = 'VC'
        if (this.category == "AVPs") this.category = 'AVP'

      }
    })

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    // console.log(this.getYears())
    this.getYears();
  }
  ngOnInit() {

  }

  selectFromDate() {


  }

  listVotes() {

    let navParams: NavigationExtras = {
      state: {
        data: this.candidates,
        category: 'History'
      }
    }

    let load;
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present()
      load = loader;

      this.retrieveData('VC').then(result => {
        this.historyList = this.historyList.concat(result)
        this.retrieveData('AVP').then(result => {
          this.historyList = this.historyList.concat(result)
          this.retrieveData('VP').then(result => {
            this.historyList = this.historyList.concat(result)
            console.log(this.historyList)
            load.dismiss();
            this.router.navigate(['/nomination-history'], navParams);

          })
        })
      })

    });





  }

  getVotes() {

  }


  generateHeader(cols) {
    var colWidths = [];
    cols.forEach(row => {
      if (row == "Name") colWidths.push(50)
      else colWidths.push(26)
    })

    return colWidths
  }
  generateVoteTable(data, cols) {
    var voteTable = [];
    let votes = []
    let stack = [{ ul: [] }]

    voteTable.push(cols);
    console.log(voteTable)
    data.forEach(function (rows) {
      let voteTableRow = [];

      cols.forEach(function (column) {
        if (rows[column] == null) voteTableRow.push("")
        else voteTableRow.push(rows[column].toString())

        // if (column != "Name" || column != "IRID" || column != "Team") stack[0].ul.push(rows[column].toString())
        // else voteTableRow.push(rows[column].toString())
      })
      voteTable.push(voteTableRow)
      // voteTable.push(stack)

    })
    console.log(voteTable)
    return (voteTable)
  }

  generatePDF() {
    // console.log(data)
    let votes = this.candidates;
    let outerTable = [];
    let innerTable = [];
    votes.forEach(element => {
      delete element.CandidateID
      delete element.IRID
      delete element.Team

      let holder = Object.entries(element)

      outerTable.push(holder.slice(0, 3))
      innerTable.push(holder.slice(3, holder.length))
    })

    console.log(outerTable)
    console.log(innerTable)

    var docdef = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      // pageMargins: [0],
      content: [

        { text: 'Votes - ' + this.selectedYear + ' - ' + this.selectedMonth, style: 'header' },

        {
          table: {
            headerRows: 1,
            // widths: ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'],
            widths: this.generateHeader(Object.keys(votes[0])),
            body: this.generateVoteTable(votes, Object.keys(votes[0])),
            pageBreak: 'before',

          }
        },

      ]
    }

    this.pdfSrc = pdfMake.createPdf(docdef)
    if (this.platform.is('cordova')) {
      //if mobile
      let load;
      this.loadCtrl.create({
        spinner: "crescent",
        message: "Loading..."
      }).then(loader => {
        loader.present()
        load = loader;
        this.pdfSrc.getBuffer((buff) => {
          var utf8 = new Uint8Array(buff);
          var binaryArray = utf8.buffer;
          var blob = new Blob([binaryArray], { type: 'application/pdf' });

          console.log(this.file.externalRootDirectory)
          this.file.writeFile(this.file.externalRootDirectory, 'VoteTally.pdf', blob, { replace: true }).then(resp => {
            this.fileOpener.open(this.file.externalRootDirectory + 'VoteTally.pdf', 'application/pdf');
            loader.dismiss();
          })
        })

      });

    } else {
      this.pdfSrc.download();
    }
  }


  getYears() {
    let body = new URLSearchParams();
    body.set('action', 'VAGetNominationYears');

    this.http.post('https://bt.the-v.net/service/api.aspx', body, this.options).toPromise().then(result => {
      let resp = result.json()
      resp.forEach(row => {
        this.yearList.push({ value: row.Year, text: row.Year.toString(), checked: false })
      });
    })
  }

  yearSelected() {
    this.enableMonth = true;

    let body = new URLSearchParams();
    body.set('action', 'VAGetNominationMonths');
    body.set('year', this.selectedYear.toString());

    this.http.post('https://bt.the-v.net/service/api.aspx', body, this.options).toPromise().then(result => {
      let resp = result.json()
      // console.log(result)
      resp.forEach(row => {
        let month = this.monthNames[row.Month]
        this.monthList.push({ value: row.Month, text: month, checked: false })
      });
    })
  }

  monthSelected() {
    let load;
    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present()
      load = loader;

      this.retrieveData(this.category).then(result => {
        this.candidates = result;
        load.dismiss();
      })

    });
  }

  async retrieveData(title) {
    let body = new URLSearchParams();
    body.set('action', 'VAGetNomination');
    body.set('title', title);
    body.set('year', this.selectedYear.toString());
    body.set('month', this.selectedMonth.toString());


    return this.http.post('https://bt.the-v.net/service/api.aspx', body, this.options).toPromise().then(result => {
      let resp = result.json()
      console.log(result)
      return resp;
    })
  }

}
