/**
 * Created by sebastian on 20.06.17.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';




//Reports komponent - her ligger alle rapportene lagret
export const ReportsDB = new Mongo.Collection('reportsDB');
if (Meteor.isServer) {
    //This code only runs on the server
    Meteor.publish('reportsDB', function reportsDBPublication() {
        return ReportsDB.find();
    });

}

//Metoder for å legge til, slette og oppdateres
Meteor.methods({
    'reportsDB.insert'(titelText, /*substrartInput,*/ lengdeNr, img, posLat, posLong, depthInput, amountInput){
        check(titelText, String);
        //check(substrartInput, String);
        check(lengdeNr, Number);
        console.log("er i insert");


        //Make sure user is logged in before inserting a report
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }


        ReportsDB.insert({
            text: titelText,
            length: lengdeNr,
            photo: img,
            epost: Meteor.user().emails[0].address,
            latitude: posLat,
            longitude: posLong,
            depth: depthInput,
            amount: amountInput,
            createdAt: new Date(),
            //substrart: substrartInput,
            submitDate: new Date(),
            owner: Meteor.userId(),
            isValidated: false,
            isCheckout: false,
        });

    },
    'reportsDB.remove'(reportId){
        check(reportId, String);

        ReportsDB.remove(reportId);
    },
    'reportsDB.setChecked'(reportId, setChecked){
        check(reportId, String);
        check(setChecked, Boolean);

        ReportsDB.update(reportId, { $set: { checked: setChecked } });
    },
    'reportsDB.setPrivate'(reportId, setToPrivate){
        check(reportId, String);
        check(setToPrivate, Boolean);

        const report = Reports.findOne(reportId);
    },
    'reportsDB.setPos'(titel, pos){
        check(titel, String);
        check(setShow, Boolean);

        Reports.update(titel, {$set: { location: pos } });
    },
    'reportsDB.getReport'(reportId){
        check(reportId, String);

        ReportsDB.findOne({ _id: reportId })
    }
});