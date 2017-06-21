import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import GoogleMap from '../../api/GoogleMap.js';
import Markers from './markers';
import { setLatLng } from '../SubmitPage.jsx';

let addedMarker = false;

export default class MyMap extends Component {
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
                zoom: 15,
            }
        }

    }

    handleOnReady(name) {
        let markerAdded = false;
        let markerPos = { lat: 60, lng: 5};
        GoogleMaps.ready(name, map => {
            Tracker.autorun(c => {
                google.maps.event.addListener(map.instance, 'click', function(event) {
                    if(Session.get('addMarker') && !addedMarker){
                        addedMarker = true;
                        Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
                        console.log("Her er pos");
                        console.log(({lat: event.latLng.lat(), lng: event.latLng.lng()}));
                        markerPos = { lat: event.latLng.lat(), lng: event.latLng.lng() };
                        setLatLng(event.latLng.lng(), event.latLng.lat());
                        Session.set('markerid', )
                    }
                });


                const markers = {};
                let dragable = addedMarker;
                if(addedMarker){
                    console.log("Markeradded er true");
                }
                    //Session.get('addMarker');

                Markers.find().observe({
                    added: function(document) {
                        const marker = new google.maps.Marker({
                            draggable: dragable,
                            animation: google.maps.Animation.DROP,
                            position: new google.maps.LatLng(document.lat, document.lng),
                            map: map.instance,
                            id: document._id,
                        });
                        if(Session.get('addMarker')) {
                            google.maps.event.addListener(marker, 'dragend', function (event) {
                                Markers.update(marker.id, {
                                    $set: {lat: event.latLng.lat(), lng: event.latLng.lng()},
                                });
                                markerPos = {lat: event.latLng.lat(), lng: event.latLng.lng()};
                                setLatLng(event.latLng.lng(), event.latLng.lat())
                            });
                        }
                        console.log("Here is a marker");
                        console.log(marker.id);
                        let lat = marker.position.lat;
                        console.log(lat);
                        console.log(marker.position.lat + " " + marker.position.lng);

                        markers[document._id] = marker;
                    },
                        /*
                    changed: function(newDocument, oldDocument) {
                        markers[newDocument._id].setPosition({
                            lat: newDocument.lat,
                            lng: newDocument.lng,
                        });
                    },
                    removed: function(oldDocument) {
                        markers[oldDocument._id].setMap(null);
                        google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
                        delete markers[oldDocument._id];
                    },*/
                });

                this.computation = c;
            });
        });
    }

    componentWillUnmount() {
        this.computation.stop();
    }

    render() {
        return (
            <GoogleMap
                onReady={this.handleOnReady}
                mapOptions={this.handleMapOptions}
            >
                Loading!
            </GoogleMap>
        );
    }
}

MyMap.propTypes = {
    report: PropTypes.object,
};
