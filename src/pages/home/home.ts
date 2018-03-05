import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController, Platform, AlertController} from 'ionic-angular';
//import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

	@ViewChild('map') mapRef:ElementRef;
	lat: any;
	lng: any;
	location: any;
	option: any;
	map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
	app: App,
	menu: MenuController,
  	public alertCtrl: AlertController,
  	private geolocation: Geolocation,
  	private locationAccuracy: LocationAccuracy
  	){
		menu.enable(true);
		menu.swipeEnable(false);
  }

  ionViewDidLoad(){
  	console.log(this.mapRef);
  	this.DisplayMap();
  }

	DisplayMap(){
		this.location = new google.maps.LatLng('10.338414','123.911775');

		this.option ={
			center:this.location,
			zoom: 15
		};

		this.map = new google.maps.Map(this.mapRef.nativeElement,this.option);


	}



// 	DisplayMap(){

//     this.geolocation.getCurrentPosition().then((position) => {

//       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

//       let mapOptions = {
//         center: latLng,
//         zoom: 15,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       }

//       this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

//     }, (err) => {
//       console.log(err);
//     });

//   }

	askLocation(){
		this.locationAccuracy.canRequest().then((canRequest: boolean) => {
			if(canRequest) {
				// the accuracy option will be ignored by iOS
				this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
					() => this.getLocation(), //console.log('Request successful'),
					error => console.log('Error requesting location permissions', error)
				);
			}
		});
	}

	askLocation1(){
		this.geolocation.getCurrentPosition().then((resp) => {
			this.locationAccuracy.canRequest().then((canRequest: boolean) => {
				if(canRequest) {
					// the accuracy option will be ignored by iOS
					this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
						() => this.getLocation(), //console.log('Request successful'),
						error => console.log('Error requesting location permissions', error)
					);
				}
			});
		 }).catch((error) => {
			   console.log('Error getting location', error);
		 });
	}

	getLocation(){
		this.geolocation.getCurrentPosition().then((resp) => {
		   this.lat = resp.coords.latitude;
		   this.lng = resp.coords.longitude;
	  		console.log(resp.coords.latitude);
	  		console.log(resp.coords.longitude);

	  		this.location = new google.maps.LatLng(this.lat, this.lng);
			this.option ={
				center:this.location,
				zoom: 17
			};

			this.map = new google.maps.Map(this.mapRef.nativeElement,this.option);
		}).catch((error) => {
	  		console.log('Error getting location', error);
		});
	}
}