/**
 * Created by sebas on 03.05.2017.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { DDP } from 'meteor/ddp-client';

import Markers from '../ui/ViewReport_components/markers.jsx';
import newReportValidated from '../../lib/router.jsx';

//Reports komponent - her ligger alle rapportene lagret
export const Reports = new Mongo.Collection('reports');

if (Meteor.isServer) {
    let remote = DDP.connect('http://localhost:3030/');
    Tasks = new Meteor.Collection('tasks', remote);

    remote.subscribe('tasks', function() {
        let tasks = Tasks.find();
        console.log("Antall tasks kommer under");
        console.log("Antall tasks: " + tasks.count());
    });
    //This code only runs on the server
    Meteor.publish('reports', function reportsPublication(limit) {
        return Reports.find({}, {sort: {createdAt: -1}, limit: limit, owner: this.userId});
    });

    Meteor.publish('reports.adminPage', function reportsPublication(){
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
        Email.send({
            from: "sebastianfroyen@gmail.com",
            to: "sebastian17pepp@gmail.com",
            subject: "Meteor can send emails via gmail",
            text: "Dette er teksten",
        });
    },

    'reports.insert'(titelText, /*substrartInput,*/ lengdeNr, img, posLat, posLong,
                     depthInput, amountInput, markerId, useCurrPos, category, date){
        check(titelText, String);
        //check(substrartInput, String);
        check(lengdeNr, Number);


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
            user: Meteor.user().emails[0].address,
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
            checkedOut: false,
            reportFeedback: '',
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
        let report = Reports.findOne({_id: reportId});
        newReportValidated(report.text, report._id, report.markerId);
    },
});