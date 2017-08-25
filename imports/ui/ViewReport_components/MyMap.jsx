import React, { Component } from 'react';
import GoogleMap from '../../api/GoogleMap.js';
import Markers from './markers';
import { setLatLng, setMarkerId } from '../SubmitPage.jsx';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

let addedMarker = false;
let markerId = "";

class MyMap extends Component {
    constructor() {
        super();
        this.handleOnReady = this.handleOnReady.bind(this);
        this.handleMapOptions = this.handleMapOptions.bind(this);
    }

    handleMapOptions() {

        if(this.props.report) {
            return {
                center: new google.maps.LatLng(this.props.report.longitude, this.props.report.latitude),
                zoom: 15,
            };
        } else {
            return {
                center: new google.maps.LatLng(60.399975, 5.303949),
                zoom: 5,
            }
        }

    }


    handleOnReady(name) {
        localStorage.setItem('addedMarker', false);
        let addedMarker = false;
        let markerPos = { lat: 60, lng: 5};
        GoogleMaps.ready(name, map => {
            Tracker.autorun(() => {
                if(this.props.report === null) {
                    google.maps.event.addListener(map.instance, 'click', function (event) {
                        console.log("Adding");
                        if (localStorage.getItem('addMarker') && !addedMarker) {
                            addedMarker = true;
                            localStorage.setItem('addedMarker', true);
                            Markers.insert({lat: event.latLng.lat(), lng: event.latLng.lng(), current: true});
                            markerPos = {lat: event.latLng.lat(), lng: event.latLng.lng()};
                            setLatLng(event.latLng.lng(), event.latLng.lat());
                        }
                    });
                }

                const markers = {};

                Markers.find({current: true}).observe({
                    added: function(document) {
                        console.log("Markers.find");
                        let marker = new google.maps.Marker({
                            draggable: addedMarker,
                            animation: google.maps.Animation.DROP,
                            position: new google.maps.LatLng(document.lat, document.lng),
                            map: map.instance,
                            id: document._id,
                        });

                        /*if(localStorage.getItem('addMarker')) {
                            google.maps.event.addListener(marker, 'dragend', function (event) {
                                Markers.update(marker.id, {
                                    $set: {lat: event.latLng.lat(), lng: event.latLng.lng()},
                                });
                                markerPos = {lat: event.latLng.lat(), lng: event.latLng.lng()};
                                setLatLng(event.latLng.lng(), event.latLng.lat())
                            });
                            google.maps.event.addListener(marker, 'click', function (event) {
                                console.log("remove");
                                marker.remove(marker.id);
                                Markers.remove(marker.id);
                            });
                        }*/
                        setMarkerId(document._id);
                        markerId = document._id;
                        markers[document._id] = marker;
                    },
                });

                if(this.props.report) {
                    const marker = new google.maps.Marker({
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(this.props.report.longitude, this.props.report.latitude),
                        map: map.instance,
                        id: this.props.report._id,
                    });
                }

            });
        });
    }

    async componentWillUnmount() {

        try {
            await Meteor.callAsync('marker.updateCurrent', markerId);
        } catch (err) {
            console.log(err);
            console.log(err.message);
            console.log(err.reason);
        }
        /*Markers.update(markerId, {
            $set: {current: false},
        });*/
    }

    render() {
        return (
            <div>
            <GoogleMap
                onReady={this.handleOnReady}
                mapOptions={this.handleMapOptions}
            >
                Loading!
            </GoogleMap>
            </div>
        );
    }
}



export default createContainer(() => {
    Meteor.subscribe('markers', localStorage.getItem('marker.id'));
    return {
        markers: Markers.find({_id: localStorage.getItem('marker.id')}).fetch,
    };
}, MyMap);