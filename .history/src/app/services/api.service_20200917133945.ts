import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SqliteService } from './sqlite.service';
import { Ambassador } from '../../models/ambassador.model';
import { Corporate } from '../../models/corporate.model'
import { HTTP } from '@ionic-native/http/ngx'
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options;
  private apiURL = 'https://vaservice.the-v.net/site.aspx'
  constructor(
    private http: Http,
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
            if (amb['imgUrl'].includes('www.the-v.net')) amb['imgUrl'] = amb['imgUrl'].replace('www.the-v.net', 'site.the-v.net')
            else if (amb['imgUrl'].includes('http://the-v.net')) amb['imgUrl'] = amb['imgUrl'].replace('http://the-v.net', 'http://site.the-v.net')


            let reader = new FileReader();
            this.nativeHttp.sendRequest(amb['imgUrl'], { method: 'get', responseType: 'blob', data: {}, headers: {} })
              .then(result => {
                let data;
                reader.readAsDataURL(result.data);
                reader.onloadend = () => {
                  data = reader.result
                  // data = "data:image/jpeg;base64," + data;
                  amb['imgUrl'] = data
                  amb['imgUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(amb['imgUrl'])

                }
              }, error => {
                console.log(error)
              })

            if (amb.Rank === '1') {
              amb.Image = 'assets/imgs/profile-photos-dato.png';
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
          this.sqlSvc.insertCorp(corp)
        })
        return r as Array<Corporate>;

      }
    })
  }
}
