import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy} from '@ionic-native/location-accuracy';
import { Camera } from '@ionic-native/camera';
import { GooglePlus} from '@ionic-native/google-plus';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import {NativeStorage } from '@ionic-native/native-storage';
import { Geofence } from '@ionic-native/geofence';

import { AngularFireModule} from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { FinesAndPenaltiesService } from '../services/fines-and-penalties/fines-and-penalties.service';
import firebase from 'firebase';


firebase.initializeApp(FIREBASE_CONFIG);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    LocationAccuracy,
    Camera,
    FinesAndPenaltiesService,
    GooglePlus,
    AndroidPermissions,
    NativeStorage,
    Geofence,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
