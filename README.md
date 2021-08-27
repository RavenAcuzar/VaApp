# ![App Icon](https://github.com/RavenAcuzar/VaApp/blob/master/resources/android/icon/drawable-xxhdpi-icon.png) 
# V Ambassadors App

The V caters to the global network by providing support and assistance to a dedicated group of international leaders and trainers collectively known as V Ambassadors. This mobile app presents a centralized system for V Ambassadors to stay updated and connected with the latest and relevant news from The V. It features a comprehensive list of V Ambassadors, directory of essential corporate staff, access to the VA handbook, video messages from Chief, and news dock from The V. V Ambassadors can also file their travel requests through the app for more convenient transactions.

Download now on [Google Play](https://play.google.com/store/apps/details?id=net.thev.vaappnew2020) and [Appstore](https://apps.apple.com/ph/app/the-v-ambassadors/id1558699714)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Setup the following requirements to your local machine.

- [Node.js](https://nodejs.org/en/)
- [Setup Ionic](https://ionicframework.com/docs/intro/cli)
- [Setup Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [IOS Development](https://ionicframework.com/docs/developing/ios)
- [Android Development](https://ionicframework.com/docs/developing/android)

### Initialize

Create ionic starter app.
```
ionic start VaApp https://github.com/RavenAcuzar/VaApp/
```
Initialize node packages.
```
npm i
```
Run the app.
```
ionic serve
```
To add platform (Android/IOS)
```
ionic cordova platform add android
```
```
ionic cordova platform add ios
```

### Build App

Run the following commands for building the app.
(Android) For generating release apk add `--prod --release`
```
ionic cordova build android
```
(IOS) For generating release apk add `--prod`. Open project in XCode then run build, Archive, then upload to Appstore.
```
ionic cordova build ios
```

## Key Features
- V Ambassadors and Corporate Staff details
- Travel Report Filing for V Ambassadors
- Exclusive VA related videos
- VA related News and Updates
- VA Nomination with report generation


## To Do
- Clean unused codes

## Built with

* Ionic 4 (Ionic Angular Framework)
* Typescript
* HTML, Css/Scss

## Authors and Contributors

* **Rico Raven Acuzar** - [linkedin.com/in/rico-raven/](https://www.linkedin.com/in/rico-raven/)
