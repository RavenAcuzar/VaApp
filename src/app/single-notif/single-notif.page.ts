import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-single-notif',
  templateUrl: './single-notif.page.html',
  styleUrls: ['./single-notif.page.scss'],
})
export class SingleNotifPage implements OnInit {

  data: any;

  constructor(
    private aroute: ActivatedRoute,
    private router: Router
  ) {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
      }
    })
  }

  ngOnInit() {
  }

}
