import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SqliteService } from './sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { Corporate } from '../../models/corporate.model'
import { HTTP } from '@ionic-native/http/ngx'
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx'
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options;
  private apiURL = 'https://vaservice.the-v.net/site.aspx'
  constructor(
    private http: Http,
    private file: File,
    private sqlSvc: SqliteService, private nativeHttp: HTTP,
    private sanitizer: DomSanitizer
  ) {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }
  /////PUT ALL API CALLS HERE/////////

  getTravelRequest(id) {
    let body = new URLSearchParams();
    body.set('action', 'ViewTravelRequest');
    body.set('corp', id);



    return this.http.post("https://vaservice.the-v.net/site.aspx",
      body,
      this.options)
      .subscribe(
        res => {
          return res;
          // console.log(res.json())
          // this.requests = res.json();
          // this.requests = this.requests.filter(item => {
          //   return item.Name == this.user.Name
          // })
          // this.load.dismiss();
        },
        err => {
          console.log(err);
        }
      )

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
    body.set('action', 'Ambassador_CreateTravelRequest')
    body.set('id', id)
    body.set('destination', request.Destination)
    body.set('startDate', request.StartDate)
    body.set('endDate', request.EndDate)
    body.set('purpose', request.Purpose)
    body.set('remarks', request.Remarks)

    // console.log(body)
    return this.http.post(this.apiURL,
      body,
      this.options)
      .toPromise().then(
        res => {
          return res;
        },
        err => console.log(err)
      );
  }
  sendTravelRequest(request) {
    // let body = `action=${encodeURIComponent("Ambassador_EditSingle")}` +
    // 	`&id=${encodeURIComponent(this.profile.ID)}` +
    // 	`&name=${encodeURIComponent(this.profile.Name)}` +
    // 	`&position=${encodeURIComponent(this.profile.Position)}` +
    // 	`&email=${encodeURIComponent(this.profile.Email)}` +
    // 	`&contactnum=${encodeURIComponent(this.profile.Contact)}` +
    //   `&updatedby=${encodeURIComponent(this.name)}`;

    let body = `action=${encodeURIComponent("sp_NewTravelRequest")}` +
      `&StartDate=${encodeURIComponent(request.StartDate)}` +
      `&EndDate=${encodeURIComponent(request.EndDate)}` +
      `&Destination=${encodeURIComponent(request.Destination)}` +
      `&Purpose=${encodeURIComponent(request.Purpose)}` +
      `&Remarks=${encodeURIComponent(request.Remarks)}` +
      `&AmbassadorID=${encodeURIComponent(request.id)}` +
      `&Name=${encodeURIComponent(request.CreatedBy)}`;

    return this.http.post(this.apiURL, body, this.options).toPromise().then(resp => {
      let result = resp.json();
      return result;

    })
  }
  getAllAmbassadors() {
    let body = new URLSearchParams();
    body.set('action', 'Ambassador_GetAll');
    return this.http.post(this.apiURL, body, this.options)
      .toPromise().then(resp => {
        let r = resp.json();
        if (r.length > 0) {
          r.map(a => {
            a.NewDescription = a.NewDescription.replace(/'/g, "&#39;");
            return a;
          });
          r.forEach(a => {
            let amb = new Ambassador();
            amb.fromJson(a);
            if (amb.Image.includes('www.the-v.net')) amb.Image = amb.Image.replace('www.the-v.net', 'site.the-v.net')
            else if (amb.Image.includes('http://the-v.net')) amb.Image = amb.Image.replace('http://the-v.net', 'http://site.the-v.net')


            let reader = new FileReader();
            this.nativeHttp.sendRequest(amb.Image, { method: 'get', responseType: 'blob', data: {}, headers: {} })
              .then(result => {
                let data;
                reader.readAsDataURL(result.data);
                reader.onloadend = () => {
                  data = reader.result
                  // data = "data:image/jpeg;base64," + data;
                  amb.Image = data
                  // amb['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(amb['imgUrl'])

                }
              }, error => {
                console.log(error)
              })

            if (amb.Rank === '1') {
              amb.Image = 'assets/imgs/profile-photos-dato.png';
              this.file.readAsDataURL('assets/imgs/', 'profile-photos-dato.png').then(res => {
                console.log(res)
              }, error => {
                console.log(error)
              })
            } else if (amb.Rank === '2') {
              amb.Image = 'assets/imgs/profile-photos-japa.png';
            }
            this.sqlSvc.insertAmbassador(amb);
          });
          return r as Array<Ambassador>;
        }
      })
  }
  getAllCorp() {

    let body = new URLSearchParams();
    body.set('action', 'Corporate_GetAll');

    return this.http.post(this.apiURL, body, this.options).toPromise().then(result => {
      let r = result.json()
      if (r.length > 0) {
        r.forEach(a => {
          let corp = new Corporate();
          corp.fromJson(a)
          // this.corporate.forEach(item => {
          corp.Image = corp.Image.replace('http://the-v.net', 'http://site.the-v.net')

          let reader = new FileReader();
          this.nativeHttp.sendRequest(corp.Image, { method: 'get', responseType: 'blob', data: {}, headers: {} })
            .then(result => {
              let data;
              reader.readAsDataURL(result.data);
              reader.onloadend = () => {
                data = reader.result
                // data = "data:image/jpeg;base64," + data;
                corp.Image = data
                // item['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(item.Image)
                this.sqlSvc.insertCorp(corp)

              }
            }, error => {
              console.log(error)
            })
          // })
          // console.log(corp)

        })
        return r as Array<Corporate>;

      }
    })
  }
}
