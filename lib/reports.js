/**
 * Created by sebas on 03.05.2017.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
import { DDP } from 'meteor/ddp-client';

import Markers from '../imports/ui/ViewReport_components/markers.jsx';
import newReportValidated from './router.jsx';

//Reports komponent - her ligger alle rapportene lagret

//export const Reports = new Mongo.Collection('reports');
export const remote = DDP.connect('http://172.16.251.182:3030/');
export const Reports = new Meteor.Collection('reports', remote);



if (Meteor.isServer) {

    //This code only runs on the server
    Meteor.publish('reports', function reportsPublication(limit, fields) {
        return Reports.find({ owner: this.userId }, {sort: {createdAt: -1}, fields: fields,
            limit: limit });
    });

    Meteor.publish('reports.reportingToolList', function reportsPublication(fields){
        return Reports.find({}, {fields: fields});
    });

    Meteor.publish('reports.adminPageList', function reportsPublication(validated, fields){
        return Reports.find({isValidated: validated}, { sort: { createdAt: -1}, fields: fields});
    });

    Meteor.publish('reports.adminPageListWithCategory', function reportsPublication(category, validated, fields){
        return Reports.find({isValidated: validated, category: category}, { sort: { createdAt: -1}, fields: fields});
    });

    Meteor.publish('reports.findOne', function reportsPublication(rId, fields){
        return Reports.find({_id: rId}, {fields: fields});
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
    'sendPassRecoveryLink'(email){
        let user = Meteor.users.findOne({address: email});
        if(user){
            Accounts.forgotPassword({email: email},function(err){
                if(err){
                    console.log(err.reason);
                }
            });
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
            scientist: '',
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

    'test'(){
        return true
    },

    'reports.setCheckedOut'(id, checkedOut, scientistEmail){
        check(id, String);
        check(checkedOut, Boolean);
        Reports.update(id, {
            $set: {checkedOut: checkedOut, scientist: scientistEmail}
        });
    },
});