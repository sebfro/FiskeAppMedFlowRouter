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
export const Reports = new Mongo.Collection('reports');

if (Meteor.isServer) {
    /*let remote = DDP.connect('http://localhost:3030/');
    Tasks = new Meteor.Collection('tasks', remote);

    remote.subscribe('tasks', function() {
        let tasks = Tasks.find();
        console.log("Antall tasks kommer under");
        console.log("Antall tasks: " + tasks.count());
    });*/
    //This code only runs on the server
    Meteor.publish('reports', function reportsPublication(limit) {
        return Reports.find({}, {sort: {createdAt: -1}, limit: limit, owner: this.userId});
    });

    Meteor.publish('reports.adminPageList', function reportsPublication(){
        return Reports.find({isValidated: false}, { sort: { createdAt: -1}});
    });

    Meteor.publish('reports.listwCategoryFilter', function reportsPublication(category){
        return Reports.find({category: category}, { sort: { createdAt: -1}});
    });

    Meteor.publish('reports.findOne', function reportsPublication(rId){
        return Reports.find({_id: rId});
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
                } else {
                    console.log("It worked");
                }
            });
            /*
            Accounts.forgotPassword(user._id, function(err){
                if(err){
                    console.log(err.reason);
                } else {
                    console.log("It worked");
                }
            })
            */
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