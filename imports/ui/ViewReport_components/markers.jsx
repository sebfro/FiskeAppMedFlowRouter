import { Mongo } from 'meteor/mongo';

const Markers = new Mongo.Collection('markers');
export default Markers;

if(Meteor.isServer){
    Meteor.publish('markers', function publishMarkers(markerId) {
        return Markers.find({_id: markerId});
    });
}

Meteor.methods({
    'marker.updateCurrent'(markerId){
        Markers.update(markerId, {
            $set: {current: false},
        });
    },
    'marker.insert'(lat, lng, curr){
        Markers.insert({ lat: lat, lng: lng, current: curr});
    }

});