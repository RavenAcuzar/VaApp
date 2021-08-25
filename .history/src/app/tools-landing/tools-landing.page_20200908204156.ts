import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tools-landing',
  templateUrl: './tools-landing.page.html',
  styleUrls: ['./tools-landing.page.scss'],
})
export class ToolsLandingPage implements OnInit {

  toolType: string;
  constructor(private aroute: ActivatedRoute,
    private router: Router) {
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state.data)
        this.toolType = (this.router.getCurrentNavigation().extras.state.data);

      }
    })
  }

  ngOnInit() {
  }

}
