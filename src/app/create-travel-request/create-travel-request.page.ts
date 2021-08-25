import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController, Events } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


import { TravelRequest } from '../../models/travel-request.model';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
	selector: 'app-create-travel-request',
	templateUrl: './create-travel-request.page.html',
	styleUrls: ['./create-travel-request.page.scss'],
})
export class CreateTravelRequestPage implements OnInit {

	data: TravelRequest;
	user: User;
	requestList = [];
	showVAList = false;
	vaList =[];
	selectedVAId='';
	successPost=false;
	constructor(
		public navCtrl: NavController,
		private http: HttpClient,
		private alertCtrl: AlertController,
		private datePipe: DatePipe,
		private aroute: ActivatedRoute,
		private router: Router,
		private apiSvc: ApiService,
		private authenticationService: AuthenticationService,
		private events:Events
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
	ionViewWillLeave(){
		if(!this.successPost)
		this.events.publish('returnedFromEdit');
	}

	messagePromt(head: string, message: string) {
		let b;
		if(head === "Success"){
			this.successPost = true;
			b = [{
				text:"OK",
				handler: ()=>{
					let navParams: NavigationExtras = {
						state: {
						  data: this.user
						}
					  }
					this.events.publish('user:updated', true);
					this.router.navigate(['/travel-request'], navParams);
				}
			}]
		}
		else
			b = ['OK'];
		this.alertCtrl.create({
			header: head,
			subHeader: message,
			buttons: b
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
		let copy = [...this.requestList];
		
		let id;
		if (this.showVAList)
			id = this.selectedVAId;
		else
			id = this.user.ID;
		for (let i = 0; i < this.requestList.length; i++) {
			// let request = JSON.stringify(this.requestList[i])
			// let res =
			this.apiSvc.createTravelRequest(this.requestList[i], id).then(res => {
				let holder = res.text();
				if (holder == "True" ) {
					copy.splice(0,1);
					console.log(this.requestList.length);
					console.log(copy.length);
					if(i==this.requestList.length-1){
						this.messagePromt("Success", "Request Created");
						this.cleanData(copy);
						
					}
				}
				else {
					this.messagePromt("Error", "Something went wrong");
					i=this.requestList.length;
					this.cleanData(copy);
				}
			}).catch(()=>{
				this.messagePromt("Error", "Something went wrong");
					i=this.requestList.length;
					this.cleanData(copy);
			})
			

			// this.http.post('http://localhost:8080/travelRequest', { data: body }, this.options).subscribe(res => {
			// 	console.log(res)
			// }, error => {
			// 	console.log(error)
			// })
		}
		
	}
	cleanData(copy){
		console.log(copy.length>0);
		if(copy.length>0){
			this.requestList = [...copy];
		}
		else {
			//reset
			let t = new TravelRequest();
			this.requestList = [];
			this.requestList.push(t);
			console.log(this.requestList);
			//this.requestList.push(this.data);
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
				data: this.user
			}
		}
		// this.navCtrl.navigateForward(['/profile'], navParams);

		this.router.navigate(['/travel-request'], navParams);
	}

	retrieveData() {
		this.authenticationService.getUser().then(user => {
			this.user = user;
			if(user.Type == "Poweruser" || user.Department == "VNS" || user.Department == "GLAD")
			{
				this.showVAList = true;
				this.apiSvc.getAssignedVAList(user.Name).then(res=>{
					let r = res.json();
					this.vaList = r;
				})
			}
		});
	}

}
