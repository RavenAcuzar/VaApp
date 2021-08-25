import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.page.html',
  styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  moveToLanding(tool) {
    console.log(tool)

    let navParams: NavigationExtras = {
      state: {
        data: tool,
      }
    }
    // this.navCtrl.navigateForward(['/profile'], navParams);

    this.router.navigate(['/tools-landing'], navParams);
  }
}
