import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import GoogleMap from '../../api/GoogleMap.js';
import Markers from './markers';
import { setLatLng, setMarkerId } from '../SubmitPage.jsx';
import { Mongo } from 'meteor/mongo';
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
        Session.set('addedMarker', false);
        let addedMarker = false;
        let markerPos = { lat: 60, lng: 5};
        GoogleMaps.ready(name, map => {
            Tracker.autorun(c => {
                google.maps.event.addListener(map.instance, 'click', function(event) {
                    if(Session.get('addMarker') && !addedMarker){
                        addedMarker = true;
                        Session.set('addedMarker', true);
                        Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng(), current: true });
                        markerPos = { lat: event.latLng.lat(), lng: event.latLng.lng() };
                        setLatLng(event.latLng.lng(), event.latLng.lat());
                    }
                });

                const markers = {};

                Markers.find({current: true}).observe({
                    added: function(document) {
                        const marker = new google.maps.Marker({
                            draggable: addedMarker,
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

    componentWillUnmount() {

        Meteor.call('marker.updateCurrent', markerId);
        /*Markers.update(markerId, {
            $set: {current: false},
        });*/
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



export default createContainer(() => {
    Meteor.subscribe('markers', Session.get('marker.id'));
    return {
        markers: Markers.find({_id: Session.get('marker.id')}).fetch,
    };
}, MyMap);