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
    'reports.insert'(titelText, kommentarText, lengdeNr){
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
            createdAt: new Date(),
            owner: Meteor.userId(),
            email: Meteor.user().email,
        });

        console.log("hei");
},
    'reports.remove'(taskId){
        check(taskId, String);

        Reports.remove(taskId);
    },
    'reports.setChecked'(taskId, setChecked){
        check(taskId, String);
        check(setChecked, Boolean);

        Reports.update(taskId, { $set: { checked: setChecked } });
    }
});