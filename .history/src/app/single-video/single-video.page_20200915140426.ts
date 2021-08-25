import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.page.html',
  styleUrls: ['./single-video.page.scss'],
})
export class SingleVideoPage implements OnInit {

  private readonly mainUrl: string = "http://players.brightcove.net/3745659807001/67a68b89-ec28-4cfd-9082-2c6540089e7e_default/index.html?fullscreen=1&autoplay=1&videoId=";
  videoSrc: string;
  content: any;

  constructor(
    private aroute: ActivatedRoute,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.content = this.router.getCurrentNavigation().extras.state.data;
      }
    })

    this.videoSrc = this.mainUrl + this.content.bcid;
  }


}

@Pipe({ name: "safe" })

export class SafePipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer) {

  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
}