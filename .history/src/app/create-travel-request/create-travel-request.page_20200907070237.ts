import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { TravelRequest } from '../../models/travel-request.model';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-travel-request',
  templateUrl: './create-travel-request.page.html',
  styleUrls: ['./create-travel-request.page.scss'],
})
export class CreateTravelRequestPage implements OnInit {

  data: TravelRequest;
  user: User;

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private aroute: ActivatedRoute,
    private router: Router
  ) {
    this.data = new TravelRequest();
    this.aroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.data;
      }
    })
  }

  ngOnInit() {
  }

  messagePromt (head: string, message: string) {
		this.alertCtrl.create({
			header: head,
			subHeader: message,
			buttons: ["OK"]
		}).then(alert => alert.present());
	}

	beforeSaving () {
		this.alertCtrl.create({
			header: "Create Request",
			subHeader: "Are you sure you want to create this request?",
			buttons: [
				{
					text: "No"
				},
				{
					text: "Yes",
					handler: () => {
						this.postForm();
					}
				}
			]
		}).then(alert => alert.present());
	}

	postForm () {
		let body: string = `action=${encodeURIComponent("Ambassador_CreateTravelRequest")}` +
		`&id=${encodeURIComponent(this.user.ID)}` +
		`&destination=${encodeURIComponent(this.data.Destination)}` +
		`&startDate=${encodeURIComponent(this.data.StartDate)}` +
		`&endDate=${encodeURIComponent(this.data.EndDate)}` +
		`&purpose=${encodeURIComponent(this.data.Purpose)}` +
		`&remarks=${encodeURIComponent(this.data.Remarks)}`;

		this.http.post("https://vaservice.the-v.net/site.aspx",
						body,
						{headers: {"Content-Type": "application/x-www-form-urlencoded"},
						responseType: "text"})
			.subscribe(
				res => {
					if (res == "True") {
						this.messagePromt("Success", "Request Created");
					}

					else {
						this.messagePromt("Error", "Something went wrong");
					}
				},
				err => this.messagePromt("Something went wrong", err)
			);
	}

}
