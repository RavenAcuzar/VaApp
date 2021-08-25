import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Defaults } from '../objects';
import { ApiService } from '../services/api.service';

import { User } from '../../models/user.model';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  Defaults_: Defaults = new Defaults();

  videos: any[] = [];
  load: any;
  cond: boolean = false;
  options: any;
  page: number = 0;
  canLoadMore: boolean = true;
  constructor(
    public navCtrl: NavController,
    private http: Http,
    private loadCtrl: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private apiSvc: ApiService

  ) {

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    this.storage.get("user")
      .then((val: User) => {
        if (val != undefined && Object.keys(val).length > 0) {
          this.cond = true;
        }
      }).catch(err => console.log(err));

  }


  ngOnInit() {
    this.postRetrieve();
  }

  postRetrieve() {
    this.page += 1;

    this.loadCtrl.create({
      spinner: "crescent",
      message: "Loading..."
    }).then(loader => {
      loader.present()
      this.load = loader;
    });

    this.apiSvc.getVideos(4, this.page).then(res => {
      // console.log(res.json())
      console.log(res.json.length != 0)
      this.canLoadMore = (res.json.length != 0)
      if (this.videos.length == 0) {
        this.videos = res.json()
      }
      else {
        this.videos = this.videos.concat(res.json())
      }
      this.load.dismiss();
    })
    // let body = `action=${encodeURIComponent("Video_GetSearch")}` +
    //   `&word=${encodeURIComponent("V Ambassador")}` +
    //   `&count=${encodeURIComponent("4")}` +
    //   `&page=${encodeURIComponent("1")}`;


  }

  loadMoreVideos() {

  }

  selectVideo(vid) {
    if (this.cond) {

      let navParams: NavigationExtras = {
        state: {
          data: vid
        }
      }

      this.navCtrl.navigateForward(['/single-video'], navParams);
    }

    else {
      this.alertCtrl.create({
        header: "",
        subHeader: "You need to log-in to access this page",
        buttons: ["OK"]
      }).then(alert => alert.present());
    }
  }

}
