import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Ambassador } from '../../models/ambassador.model';
import { Corporate } from '../../models/corporate.model';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  ///////PUT ALL SQL QUERIES HERE///////////
  private ambassadorQuery = `create table if not exists Ambassador(
		ID varchar(63),
		title varchar(63),
		position varchar(63),
		companytitle varchar(63),
		name varchar(127),
		irid varchar(15),
		team varchar(31),
		email varchar(127),
		contactnum varchar(31),
		imgUrl varchar(127),
		Status varchar(15),
		Rank varchar(31),
		NewDescription varchar(5000)
	);`;

  private corporateQuery = `create table if not exists Corporate(
		ID varchar(63),
		runningNum varchar(15),
		Title varchar(15),
		Name varchar(63),
		CompanyTitle varchar(63),
		ContactNumber varchar(31),
		Email varchar(127),
		Department varchar(15),
		Region varchar(63),
		Image varchar(127)
  );`;

  constructor(private sqlite: SQLite) { }

  private openSqliteDb(sqlite: SQLite) {
    return sqlite.create({
      name: 'vapp.db',
      location: 'default'
    });
  }
  private createTable(db: SQLiteObject, query: string) {
    return new Promise<SQLiteObject>((resolve, reject) => {
      try {
        db
          .executeSql(query, [])
          .then(() => {
            resolve(db);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  insertAmbassador(ambassador: Ambassador) {
    this.prepareAmbassadorTable().then(db => {
      db.executeSql(`INSERT INTO Ambassador VALUES(
        '${ambassador.ID}',
        '${ambassador.Title}',
        '${ambassador.Position}',
        '${ambassador.CompanyTitle}',
        '${ambassador.Name}',
        '${ambassador.IRID}',
        '${ambassador.Team}',
        '${ambassador.Email}',
        '${ambassador.Contact}',
        '${ambassador.Image}',
        '${ambassador.Status}',
        '${ambassador.Rank}',
        '${ambassador.Description}'
      )`, []);
    })

  }

  insertCorp(corp: Corporate) {
    this.prepareCorporateTable().then(db => {
      db.executeSql(`INSERT INTO Corporate VALUES(
        '${corp.ID}',
        '${corp.RunningNum}',
        '${corp.Title}',
        '${corp.Name}',
        '${corp.CompanyTitle}',
        '${corp.Contact}',
        '${corp.Email}',
        '${corp.Department}',
        '${corp.Region}',
        '${corp.Image}'
      )`, []);
    });
  }

  async getAmbassadorsData(params?: { title?: string, id?: string }) {
    const db = await this.prepareAmbassadorTable();
    let data;
    if (params) {
      if (params.id != null) {
        data = await db.executeSql(`Select * from Ambassador WHERE ID='${params.id}'`, []);
      } else (params.title != null)
      data = await db.executeSql(`Select * from Ambassador WHERE title='${params.title}'`, []);
    }
    else
      data = await db.executeSql('Select * from Ambassador', []);
    return data.rows as Array<Ambassador>;
  }
  async getCorporatesData() {
    const db = await this.prepareCorporateTable();
    let data
    data = await db.executeSql('Select * from Corporate', []).then(result => {
      data = result;
      console.log(result.rows)
      console.log(result.rows.item(1))
    })
    return data.rows as Array<Corporate>;
  }

  // async getCorporateByDepartment(dep) {
  //   const db = await this.prepareCorporateTable();
  //   let data = await db.executeSql('SELECT * FROM `t_corporatestaff` where Department=', []);
  // }

  private async prepareAmbassadorTable() {
    const db = await this.openSqliteDb(this.sqlite);
    return this.createTable(db, this.ambassadorQuery);
  }
  private async prepareCorporateTable() {
    const db = await this.openSqliteDb(this.sqlite);
    return this.createTable(db, this.corporateQuery);
  }
}
