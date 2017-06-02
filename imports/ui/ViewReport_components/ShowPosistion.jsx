import React, {Component, PropTypes} from 'react';


let latitude = undefined;
let longitude = undefined;
let per = true;

//ShowPosition komponenten - Viser et kart med markør
export default class ShowPosition extends Component {

    getMapLocation(){
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onMapError, { enableHighAccuracy: true });
    }
    onSuccess(pos){
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;

        per = false;
    }
    getMap(lat, long){
         let mapOptions = {
             center: new google.maps.LatLng(0, 0),
             zoom: 1,
             mapTypeId: google.maps.MapTypeId.ROADMAP
         };

         map = new google.maps.Map(document.getElementById("map"), mapOptions);

         let latLong = new google.maps.LatLng(lat, long);

         let marker = new google.maps.Marker({
             position: latLong
         });

         marker.setMap(map);
         map.setZoom(15);
         map.setCenter(marker.getPosition());
    }



    render(){

        this.getMapLocation();

        this.getMap(latitude, longitude);

        return(
            <div id="map">
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLWGHOvHUe66IE3uDu_8E6pcDAQmDbVeA"/>
            </div>

        );
    }
}
