import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserAgent } from '@ionic-native/user-agent/ngx';

import { DatePicker } from '@ionic-native/date-picker/ngx'
import { DatePipe } from '@angular/common'
import { File } from '@ionic-native/file/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { HTTP } from '@ionic-native/http/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePicker,
    DatePipe,
    File,
    HTTP,
    FileOpener,
    UserAgent,
    SQLite,
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
