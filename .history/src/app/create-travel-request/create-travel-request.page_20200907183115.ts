import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


import { TravelRequest } from '../../models/travel-request.model';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { AuthenticationService } from '../services/authentication.service';


@Component({
	selector: 'app-create-travel-request',
	templateUrl: './create-travel-request.page.html',
	styleUrls: ['./create-travel-request.page.scss'],
})
export class CreateTravelRequestPage implements OnInit {

	data: TravelRequest;
	user: User;
	requestList = [];

	constructor(
		public navCtrl: NavController,
		private http: HttpClient,
		private alertCtrl: AlertController,
		private datePipe: DatePipe,
		private aroute: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService
	) {
		this.data = new TravelRequest();
		this.requestList.push(this.data)
		this.retrieveData();
		// this.aroute.queryParams.subscribe(params => {
		// 	if (this.router.getCurrentNavigation().extras.state) {
		// 		this.user = this.router.getCurrentNavigation().extras.state.data;
		// 	}
		// })
	}

	ngOnInit() {
	}

	messagePromt(head: string, message: string) {
		this.alertCtrl.create({
			header: head,
			subHeader: message,
			buttons: ["OK"]
		}).then(alert => alert.present());
	}

	beforeSaving() {
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

	postForm() {
		this.requestList.forEach(item => {
			// console.log(item)
			// item.startDate = new Date(item.startDate)
			// console.log(item.StartDate)
			console.log(this.datePipe.transform(item.StartDate, "MM/dd/yy"))
			item.StartDate = this.datePipe.transform(item.StartDate, "MM/dd/yy")
			// item.endDate = new Date(item.endDate)
			item.EndDate = this.datePipe.transform(item.EndDate, "MM/dd/yy")
			item.CreatedOn = new Date().toISOString();
			item.id = this.user.ID;
			item.CreatedBy = this.user.Name;
			item.Destination = item.Destination;
		})

		for (let i = 0; i < this.requestList.length; i++) {
			// let request = JSON.stringify(this.requestList[i])

			let body: string = `action=${encodeURIComponent("Ambassador_CreateTravelRequest")}` +
				`&id=${encodeURIComponent(this.user.ID)}` +
				`&destination=${encodeURIComponent(this.requestList[i].Destination)}` +
				`&startDate=${encodeURIComponent(this.requestList[i].StartDate)}` +
				`&endDate=${encodeURIComponent(this.requestList[i].EndDate)}` +
				`&purpose=${encodeURIComponent(this.requestList[i].Purpose)}` +
				`&remarks=${encodeURIComponent(this.requestList[i].Remarks)}`;

			this.http.post("https://vaservice.the-v.net/site.aspx",
				body,
				{
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					responseType: "text"
				})
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

			// this.http.post('http://localhost:8080/travelRequest', { data: body }, this.options).subscribe(res => {
			// 	console.log(res)
			// }, error => {
			// 	console.log(error)
			// })
		}


	}

	addRequest() {
		let request = new TravelRequest;
		this.requestList.push(request);

		console.log(this.requestList)
	}

	removeRequest(i) {
		this.requestList.splice(i, 1)
	}

	goToHistory() {
		// console.log()

		// let navParams: NavigationExtras = {
		// 	state: {
		// 		id: partner.id
		// 	}
		// }
		// // this.navCtrl.navigateForward(['/profile'], navParams);

		this.router.navigate(['/ambassador-profile']);
	}

	retrieveData() {
		this.authenticationService.getUser().then(user => {
			this.user = user;
		});
	}

}
