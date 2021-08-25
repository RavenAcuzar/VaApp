import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular'
@Component({
  selector: 'app-my-tools',
  templateUrl: './my-tools.page.html',
  styleUrls: ['./my-tools.page.scss'],
})

export class MyToolsPage implements OnInit {

  // load: any;
  // constructor(private loadCtrl: LoadingController) {
  //   this.loadCtrl.create({
  //     spinner: "crescent",
  //     message: "Loading..."
  //   }).then(loader => {
  //     this.load = loader;
  //     this.load.present();
  //   })
  // }

  ngOnInit() {
  }

  // loaded() {
  //   this.load.dismiss();
  // }

}
