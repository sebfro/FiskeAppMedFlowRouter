/**
 * Created by sebas on 03.05.2017.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Reports = new Mongo.Collection('reports');

Meteor.methods({
    'reports.insert'(titelText/*, kommentarText, lengdeNr*/){
        console.log("hei");
        check(titelText, String);
        //check(kommentarText, String);
        //check(lengdeNr, Number);

        //Make sure user is logged in before inserting a report
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        Reports.insert({
            titel: titelTextt,
            kommentar: kommentarText,
            lengde: lengdeNr,
            createdAt: new Date(),
            owner: Meteor.userId(),
            email: Meteor.user().email,
        });
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