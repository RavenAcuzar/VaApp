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

		this.checkFields().then(field => {
			if (field) {
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
			else {
				this.alertCtrl.create({
					header: "Create Request",
					subHeader: "Some important fields are blank, please try again.",
				}).then(alert => alert.present());
			}
		});

	}

	postForm() {


		for (let i = 0; i < this.requestList.length; i++) {
			// let request = JSON.stringify(this.requestList[i])

			// let body: string = `action=${encodeURIComponent("Ambassador_CreateTravelRequest")}` +
			// 	`&id=${encodeURIComponent(this.user.ID)}` +
			// 	`&destination=${encodeURIComponent(this.requestList[i].Destination)}` +
			// 	`&startDate=${encodeURIComponent(this.requestList[i].StartDate)}` +
			// 	`&endDate=${encodeURIComponent(this.requestList[i].EndDate)}` +
			// 	`&purpose=${encodeURIComponent(this.requestList[i].Purpose)}` +
			// 	`&remarks=${encodeURIComponent(this.requestList[i].Remarks)}`;

			let body = JSON.stringify(this.requestList[i])
			console.log(body)
			this.http.post("http://192.168.1.101:8080/createRequest",
				{ data: body },
				// body,
				{
					headers: { "Content-Type": "application/json" },
					// headers: { "Content-Type": "application/x-www-form-urlencoded" },
					responseType: "text"
				})
				.subscribe(
					res => {
						console.log(res)
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

	async checkFields() {

		this.requestList.forEach(item => {
			// console.log(this.datePipe.transform(item.StartDate, "MM/dd/yy"))
			item.StartDate = this.datePipe.transform(item.StartDate, "MM/dd/yy")
			item.EndDate = this.datePipe.transform(item.EndDate, "MM/dd/yy")
			item.CreatedOn = new Date().toISOString();
			item.id = this.user.ID;
			// item.id = '2CD7D7D2-2C14-4456-B24D-E57FAE8D3FB1';

			item.CreatedBy = this.user.Name;
			item.Destination = item.Destination;
		})

		for (let i = 0; i < this.requestList.length; i++) {
			for (let key of Object.keys(this.requestList[i])) {
				// console.log(key)
				// console.log(this.requestList[i][key])
				if (key != 'Remarks') {
					if (this.requestList[i][key] == "" || this.requestList[i][key] == null)
						return false
				}
			}
		}

		return true;
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

		let navParams: NavigationExtras = {
			state: {
				data: this.user.ID
			}
		}
		// this.navCtrl.navigateForward(['/profile'], navParams);

		this.router.navigate(['/travel-request'], navParams);
	}

	retrieveData() {
		this.authenticationService.getUser().then(user => {
			this.user = user;
		});
	}

}
