/**
 * Created by sebas on 03.05.2017.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

import Markers from '../ui/ViewReport_components/markers.jsx';
import newReportValidated from '../../lib/router.jsx';

//Reports komponent - her ligger alle rapportene lagret
export const Reports = new Mongo.Collection('reports');

if (Meteor.isServer) {
    //This code only runs on the server
    Meteor.publish('reports', function reportsPublication(limit) {
        console.log(limit);
        return Reports.find({}, {sort: {createdAt: -1}, limit: limit, owner: this.userId});
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
            to: "sebastian17pepp@gmail.com",
            subject: "Meteor can send emails via gmail",
            text: "Dette er teksten",
        });
        console.log("Email er ferdig");
    },

    'reports.insert'(titelText, /*substrartInput,*/ lengdeNr, img, posLat, posLong,
                     depthInput, amountInput, markerId, useCurrPos, category, date){
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

        if(!date){
            date = new Date();
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
            createdAt: new Date(),
            taken: date,
            category: category,
            //substrart: substrartInput,
            owner: Meteor.userId(),
            isValidated: false,
            isCheckout: false,
        });

},
    'reports.setChecked'(reportId, setChecked){
        check(reportId, String);
        check(setChecked, Boolean);

        Reports.update(reportId, { $set: { checked: setChecked } });
    },
    'reports.update'(reportId){
        check(reportId, String);

        Reports.update(reportId, {
            $set: {isValidated: true},
        });
        console.log("About to send notification");
        let report = Reports.findOne({_id: reportId});
        newReportValidated(report.text, report._id, report.markerId);
    }
});