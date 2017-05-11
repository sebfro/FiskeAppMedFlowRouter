/**
 * Created by sebas on 03.05.2017.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Reports = new Mongo.Collection('reports');

if (Meteor.isServer) {
    //This code only runs on the server
    Meteor.publish('reports', function reportsPublication() {
        return Reports.find();
    });
}



Meteor.methods({
    'reports.insert'(titelText, kommentarText, lengdeNr, img, pos){
        console.log("hei");
        check(titelText, String);
        check(kommentarText, String);
        check(lengdeNr, Number);

        console.log("hei");

        //Make sure user is logged in before inserting a report
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        console.log("hei");

        Reports.insert({
            titel: titelText,
            kommentar: kommentarText,
            lengde: lengdeNr,
            photo: img,
            pic: null,
            epost: Meteor.user().emails[0].address,
            location: pos,
            createdAt: new Date(),
            owner: Meteor.userId(),
            show: false,
        });

        console.log("hei");
},
    'reports.remove'(reportId){
        check(reportId, String);

        Reports.remove(reportId);
    },
    'reports.setChecked'(reportId, setChecked){
        check(reportId, String);
        check(setChecked, Boolean);

        Reports.update(reportId, { $set: { checked: setChecked } });
    },
    'reports.setPrivate'(reportId, setToPrivate){
        check(reportId, String);
        check(setToPrivate, Boolean);

        const report = Reports.findOne(reportId);
    },
    'reports.setShow'(reportId, setShow){
        check(reportId, String);
        check(setShow, Boolean);

        Reports.update(reportId, {$set: { show: setShow } });
    },
});