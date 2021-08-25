import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SqliteService } from './sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { Corporate } from '../../models/corporate.model';
import { HTTP } from '@ionic-native/http/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';
import { resolve } from 'url';
import { Storage } from '@ionic/storage';
import { AMBASSADOR_TIMESTAMPS } from '../app.constants';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private options;
	private apiURL = 'https://vaservice.the-v.net/site.aspx';
	constructor(
		private http: Http,
		private file: File,
		private sqlSvc: SqliteService,
		private nativeHttp: HTTP,
		private sanitizer: DomSanitizer,
		private storage: Storage
	) {
		this.options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		});
	}
	/////PUT ALL API CALLS HERE/////////

	updateTravelStatus(userName, tr) {
		let body = new URLSearchParams();
		body.set('action', 'VASetTravelRequestStatus');
		body.set('user', userName);
		body.set('travelId', tr.ID);
		body.set('status', tr.Status);

		const res = this.http.post('https://bt.the-v.net/service/api.aspx', body, this.options).toPromise();

		return res.then(
			(res) => {
				// console.log(res)
				// console.log(res['_body'])
				// let testJson = res['_body']
				// testJson = JSON.parse(testJson)
				// console.log(testJson)
				// console.log(testJson[0])
				// console.log(testJson[0]['Data'])

				// console.log(res.json())
				// if (res[0]['Data'] == 'false' || res[0]['Info'] == 'action is null' || res[0].length === 0) {
				let body = {
					to: '/topics/'+tr.Irid,
					data:{
						title: `Your Travel Request for ${tr.Destination} has been ${tr.Status}.`,
						message: "Check your travel request for updates!",
						priority: 1,
					}
				}
				let opt = new RequestOptions({
					headers: new Headers({
						'Content-Type': 'application/json',
						'Authorization': 'Bearer AAAAiyJpbEo:APA91bEDTqBwTmNkYwiPy7Arh8Lfobhu3lP4o6kB_Wl5-HQ_BZLG-6dzfyr5ZcB7Y1aH3U5XV77gMdwGkixFCXDZC773SPM13HlDqsg7RDr1H-binFFy6LYxIFL3sP5FmRr1x2d77i09'
					})
				});
				return this.http.post('https://fcm.googleapis.com/fcm/send', body, opt)
				.toPromise()
				.then(()=>{
					return res.text();
				},
				err=>{
					return 'error';
				})
				
			},
			(err) => {
				return 'error';
			}
		);
	}
	sendForgetPassword(email) {
		let body = new URLSearchParams();
		body.set('action', 'VASendUserDetailsEmail');
		body.set('email', email);

		const res = this.http.post('https://bt.the-v.net/service/api.aspx', body, this.options).toPromise();

		return res.then(
			(res) => {
				// console.log(res)
				// console.log(res['_body'])
				// let testJson = res['_body']
				// testJson = JSON.parse(testJson)
				// console.log(testJson)
				// console.log(testJson[0])
				// console.log(testJson[0]['Data'])

				// console.log(res.json())
				// if (res[0]['Data'] == 'false' || res[0]['Info'] == 'action is null' || res[0].length === 0) {
				return res;
			},
			(err) => {
				return 'error';
			}
		);
	}
	getNotifications(count, page) {
		// let body = new URLSearchParams();
		// body.set('action', 'getOldsNews');
		// body.set('count', '20');
		// body.set('page', '1');
		// body.set('language', 'en');
		let body = new URLSearchParams();
		body.set('action', 'getOldsNews');
		body.set('count', count);
		body.set('page', page);
		body.set('language', 'en');

		return this.http.post('https://cums.the-v.net/site.aspx', body, this.options).toPromise();
	}
	getVideos(count, page) {
		let body = new URLSearchParams();
		body.set('action', 'VAApp_Video_GetSearch');
		body.set('count', count);
		body.set('page', page);

		return this.http.post('https://bt.the-v.net/service/api.aspx', body, this.options).toPromise();
		//   res => {
		//     return res.json();
		//     // this.load.dismiss();
		//   },
		//   err => {
		//     console.log("error:" + err);
		//   }
		// );
	}
	getTravelRequest(id) {
		let body = new URLSearchParams();
		body.set('action', 'ViewTravelRequest');
		body.set('corp', id);

		return this.http.post('https://vaservice.the-v.net/site.aspx', body, this.options).toPromise();
	}
	createTravelRequest(request, id) {
		// let body: string = `action=${encodeURIComponent("Ambassador_CreateTravelRequest")}` +
		//   `&id=${encodeURIComponent(id)}` +
		//   `&destination=${encodeURIComponent(request.Destination)}` +
		//   `&startDate=${encodeURIComponent(request.StartDate)}` +
		//   `&endDate=${encodeURIComponent(request.EndDate)}` +
		//   `&purpose=${encodeURIComponent(request.Purpose)}` +
		//   `&remarks=${encodeURIComponent(request.Remarks)}`;

		let body = new URLSearchParams();
		body.set('action', 'Ambassador_CreateTravelRequest');
		body.set('id', id);
		body.set('destination', request.Destination);
		body.set('startDate', request.StartDate);
		body.set('endDate', request.EndDate);
		body.set('purpose', request.Purpose);
		body.set('remarks', request.Remarks);

		// console.log(body)
		return this.http.post(this.apiURL, body, this.options).toPromise();
	}
	sendTravelRequest(request) {
		// let body = `action=${encodeURIComponent("Ambassador_EditSingle")}` +
		// 	`&id=${encodeURIComponent(this.profile.ID)}` +
		// 	`&name=${encodeURIComponent(this.profile.Name)}` +
		// 	`&position=${encodeURIComponent(this.profile.Position)}` +
		// 	`&email=${encodeURIComponent(this.profile.Email)}` +
		// 	`&contactnum=${encodeURIComponent(this.profile.Contact)}` +
		//   `&updatedby=${encodeURIComponent(this.name)}`;

		let body =
			`action=${encodeURIComponent('sp_NewTravelRequest')}` +
			`&StartDate=${encodeURIComponent(request.StartDate)}` +
			`&EndDate=${encodeURIComponent(request.EndDate)}` +
			`&Destination=${encodeURIComponent(request.Destination)}` +
			`&Purpose=${encodeURIComponent(request.Purpose)}` +
			`&Remarks=${encodeURIComponent(request.Remarks)}` +
			`&AmbassadorID=${encodeURIComponent(request.id)}` +
			`&Name=${encodeURIComponent(request.CreatedBy)}`;

		return this.http.post(this.apiURL, body, this.options).toPromise().then((resp) => {
			let result = resp.json();
			return result;
		});
	}
	getAllAmbassadors() {
		let body = new URLSearchParams();
		body.set('action', 'Ambassador_GetAll');
		this.http
			.post(this.apiURL, body, this.options)
			.toPromise()
			.then((resp) => {
				let r = resp.json();
				if (r.length > 0) {
					r.map((a) => {
						a.NewDescription = a.NewDescription.replace(/'/g, '&#39;');
						return a;
					});
					r.forEach((a) => {
						let amb = new Ambassador();
						amb.fromJson(a);
						let reader = new FileReader();
						if (amb.Rank === '1') {
							amb.Image = 'assets/imgs/profile-photos-dato.png';
						} else if (amb.Rank === '2') {
							amb.Image = 'assets/imgs/profile-photos-japa.png';
						}
						this.sqlSvc.insertAmbassador(amb);
					});
				}
			})
			.then(() => {
				//get latest updated ON timestamp and Created On TimeStamp
				let body2 = new URLSearchParams();
				body2.set('action', 'VAApp_GetTimestamps');
				this.http.post('https://bt.the-v.net/service/api.aspx', body2, this.options).subscribe((r) => {
					this.storage.set(AMBASSADOR_TIMESTAMPS, r.json());
				});
			});
	}
	async checkforUpdates(type: string) {
    let timeStamps = await this.storage.get(AMBASSADOR_TIMESTAMPS);
    console.log(timeStamps);
		let body = new URLSearchParams();
		body.set('action', 'VA_GetUpdates');
		body.set('type', 'updates');
		body.set('data', type);
		if (type == 'ambassador') body.set('timestamp', timeStamps.AmbUpdatedOn);
		else body.set('timestamp', timeStamps.CorpUpdatedOn);

		let body2 = new URLSearchParams();
		body2.set('action', 'VA_GetUpdates');
		body2.set('type', 'new');
		body2.set('data', type);
		if (type == 'ambassador') body2.set('timestamp', timeStamps.AmbCreatedOn);
		else body2.set('timestamp', timeStamps.CorpCreatedOn);

		//get updates
		this.http
			.post('https://bt.the-v.net/service/api.aspx', body, this.options)
			.toPromise()
			.then((updates) => {
        console.log(updates);
				let r = updates.json();
				if (r.length > 0) {
					if (type == 'ambassador') {
						r.map((a) => {
							a.NewDescription = a.NewDescription.replace(/'/g, '&#39;');
							return a;
						});
						r.forEach((a) => {
							let amb = new Ambassador();
							amb.fromJson(a);
							let reader = new FileReader();
							if (amb.Rank === '1') {
								amb.Image = 'assets/imgs/profile-photos-dato.png';
							} else if (amb.Rank === '2') {
								amb.Image = 'assets/imgs/profile-photos-japa.png';
							}
							this.sqlSvc.updateAmbassador(amb);
						});
					} else {
            r.forEach((a) => {
              let corp = new Corporate();
              corp.fromJson(a);
              this.sqlSvc.updateCorp(corp);
            });
          }
				}
			})
			.then(() => {
				//get newly created data
				this.http.post('https://bt.the-v.net/service/api.aspx', body2, this.options).subscribe((resp) => {
          console.log(resp);
					let r = resp.json();
					if (r.length > 0) {
						if (type == 'ambassador') {
							r.map((a) => {
								a.NewDescription = a.NewDescription.replace(/'/g, '&#39;');
								return a;
							});
							r.forEach((a) => {
								let amb = new Ambassador();
								amb.fromJson(a);
								let reader = new FileReader();
								if (amb.Rank === '1') {
									amb.Image = 'assets/imgs/profile-photos-dato.png';
								} else if (amb.Rank === '2') {
									amb.Image = 'assets/imgs/profile-photos-japa.png';
								}
								this.sqlSvc.insertAmbassador(amb);
							});
						} else {
							r.forEach((a) => {
								let corp = new Corporate();
								corp.fromJson(a);
								this.sqlSvc.insertCorp(corp);
							});
						}
					}
				});
      })
      .finally(()=>{
        let body2 = new URLSearchParams();
				body2.set('action', 'VAApp_GetTimestamps');
				this.http.post('https://bt.the-v.net/service/api.aspx', body2, this.options).subscribe((r) => {
					this.storage.set(AMBASSADOR_TIMESTAMPS, r.json());
				});
      });
	}
	getAssignedVAList(corpName:string){
		let body = new URLSearchParams();
		body.set('action', 'ListVA_All');
		body.set('name', corpName);
		// console.log(body)
		return this.http.post(this.apiURL, body, this.options).toPromise();
	}
	getAllCorp() {
		let body = new URLSearchParams();
		body.set('action', 'Corporate_GetAll');

		this.http.post(this.apiURL, body, this.options).toPromise().then((result) => {
			let r = result.json();
			console.log(r);
			if (r.length > 0) {
				r.forEach((a) => {
					let corp = new Corporate();
					corp.fromJson(a);
					this.sqlSvc.insertCorp(corp);
				});
			}
		});
	}
}
