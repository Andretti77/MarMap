import { Component, ViewChild } from '@angular/core';
import { Geolocation} from 'ionic-native';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement;
  map: any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.initMap();

  }
  initMap(){
    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.makeMarkers();

      },(err) => {
        console.log(err);
      });

    }
    makeMarkers(){
      let markerMe = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

      let content = "<h4></h4>";

      this.addInfoWindow(markerMe,content);
    }
    addInfoWindow(Marker, content){
      let infoWindow = new google.maps.InfoWindow({
          content: content
      });
      google.maps.event.addListener(Marker, 'click', () =>{
        infoWindow.open(this.map, Marker);
      });

    }

}
