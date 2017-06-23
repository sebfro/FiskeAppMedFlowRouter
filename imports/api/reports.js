/**
 * Created by sebas on 03.05.2017.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

import Markers from '../ui/ViewReport_components/markers.jsx';

//Reports komponent - her ligger alle rapportene lagret
export const Reports = new Mongo.Collection('reports');

if (Meteor.isServer) {
    //This code only runs on the server
    Meteor.publish('reports', function reportsPublication() {
        return Reports.find();
    });

    Meteor.startup( function() {
        let username = encodeURIComponent("sebastianfroyen@gmail.com");
        let pass = encodeURIComponent("Rhkwxexty69");
        let domain = "smtp.gmail.com";
        let port = 587;
        process.env.MAIL_URL="smtp://" + username + ":" + pass + "@" + domain + ":" + port;

    })

}

//Metoder for å legge til, slette og oppdateres
Meteor.methods({
    'sendVerificationLink'(){
        let userId = Meteor.userId();
        if(userId){
            return Accounts.sendVerificationEmail(userId);
        }
    },
    'sendPassRevoveryLink'(email){
        let user = Meteor.users.findOne({address: email});
        if(user){
            Accounts.forgotPassword()
        }
    },
    'sendAEmail'(){
        console.log("Email blir kjørt");
        Email.send({
            from: "sebastianfroyen@gmail.com",
            to: "h144975@hib.no",
            subject: "Meteor can send emails via gmail",
            text: "Dette er teksten",
        });
        console.log("Email er ferdig");
    },

    'reports.insert'(titelText, /*substrartInput,*/ lengdeNr, img, posLat, posLong,
                     depthInput, amountInput, markerId, useCurrPos){
        check(titelText, String);
        //check(substrartInput, String);
        check(lengdeNr, Number);
        console.log("er i insert");


        //Make sure user is logged in before inserting a report
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        if(useCurrPos) {
            Markers.insert({lat: posLong, lng: posLat, markerCreated: false});
            markerId = Markers.findOne({markerCreated: false})._id;
            Markers.update(markerId, {
                $set: {markerCreated: true}
            });
        }
        Reports.insert({
            text: titelText,
            length: lengdeNr,
            photo: img,
            epost: Meteor.user().emails[0].address,
            latitude: posLat,
            longitude: posLong,
            depth: depthInput,
            amount: amountInput,
            markerId: markerId,
            createdAt: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
            //substrart: substrartInput,
            owner: Meteor.userId(),
            isValidated: false,
            isCheckout: false,
        });

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
    'reports.setPos'(titel, pos){
        check(titel, String);
        check(setShow, Boolean);

        Reports.update(titel, {$set: { location: pos } });
    },
    'reports.getReport'(reportId){
        check(reportId, String);

        Reports.findOne({ _id: reportId })
    }
});