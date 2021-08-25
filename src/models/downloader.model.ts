import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Events } from '@ionic/angular';

// import { DownloadsEvent } from '../events/downloads-event';
import { DownloadsEvent } from '../events/downloads-event';
import { jsonpFactory } from '@angular/http/src/http_module';

export class Downloader {
    private readonly API_URL: string = "https://vaservice.the-v.net/site.aspx";
    private readonly options = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });

    private values: Array<string>;

    constructor(
        private http: Http,
        private sqlite: SQLite,
        private event: Events) {
        this.values = new Array<string>();
    }

    storeInLocal() {
        // let body: string = `action=${encodeURIComponent("Corporate_GetAll")}`;
        let body = new URLSearchParams();
        body.set('action', 'Corporate_GetAll');
        console.log("here")
        this.http.post(this.API_URL,
            body,
            this.options)
            .subscribe(
                res => {
                    let result = res.json();
                    for (let element in result) {
                        let content: string = "";

                        content += `insert into Corporate values ('${result[element].ID}',`;
                        content += `'${result[element].runningNum}',`;
                        content += `'${result[element].Title}',`;
                        content += `'${result[element].Name}',`;
                        content += `'${result[element].CompanyTitle}',`;
                        content += `'${result[element].ContactNumber}',`;
                        content += `'${result[element].Email}',`;
                        content += `'${result[element].Department}',`;
                        content += `'${result[element].Region}',`;
                        content += `'${result[element].Image}');\n`;

                        this.values.push(content);

                    }


                    // body = `action=${encodeURIComponent("Ambassador_GetAll")}`;
                    body.set('action', 'Ambassador_GetAll');


                    this.http.post(this.API_URL,
                        body,
                        this.options)
                        .subscribe(
                            res => {

                                let result = res.json();
                                for (let element in result) {
                                    let content: string = "";
                                    let holder: string = result[element].NewDescription;
                                    holder = holder.replace(/'/g, "&#39;");

                                    content += `insert into Ambassador values ('${result[element].ID}',`;
                                    content += `'${result[element].title}',`;
                                    content += `'${result[element].position}',`;
                                    content += `'${result[element].companytitle}',`;
                                    content += `'${result[element].name}',`;
                                    content += `'${result[element].irid}',`;
                                    content += `'${result[element].team}',`;
                                    content += `'${result[element].email}',`;
                                    content += `'${<string>result[element].contactnum.replace(/'/g, "")}',`;
                                    content += `'${result[element].imgUrl}',`;
                                    content += `'${result[element].Status}',`;
                                    content += `'${result[element].Rank}',`;
                                    content += `'${holder}');`;


                                    this.values.push(content);

                                }

                                // res.json().forEach(element => {
                                //     let content: string = "";


                                //     content += `insert into Ambassador values('${element.ID}',`;
                                //     content += `'${element.title}',`;
                                //     content += `'${element.position}',`;
                                //     content += `'${element.companytitle}',`;
                                //     content += `'${element.name}',`;
                                //     content += `'${element.irid}',`;
                                //     content += `'${element.team}',`;
                                //     content += `'${element.email}',`;
                                //     content += `'${<string>element.contactnum.replace(/'/g, "")}',`;
                                //     content += `'${element.imgUrl}',`;
                                //     content += `'${element.Status}',`;
                                //     content += `'${element.Rank}',`;
                                //     content += `'${holder}');`;

                                //     this.values.push(content);
                                // });

                                this.sqlite.create({
                                    name: "vapp.db",
                                    location: "default"
                                }).then((db: SQLiteObject) => {
                                    this.values.forEach((element: string) => {
                                        db.executeSql(element, [])
                                            .then(() => console.log("Added"))
                                            .catch(err => console.log(err));
                                    });

                                    DownloadsEvent.stateChange(this.event);
                                });
                            },
                            err => console.log(err)
                        );
                },
                (err: string) => console.log(err)
            );
    }
}