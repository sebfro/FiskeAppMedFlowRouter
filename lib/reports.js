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
export const remoteCreateUser = DDP.connect('http://172.16.251.182:3000/');
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