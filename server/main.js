import { Reports } from '../imports/api/reports.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('viewReports', function(user_Id){
    return Reports.find({owner: user_Id});
});

Meteor.publish('viewSingleReport', function(u){
    return Reports.find({owner: u});
})