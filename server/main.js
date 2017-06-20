import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


//const Reports = new Mongo.Collection('reports');

if(Meteor.isServer){
    Meteor.publish('reportColl', function reportsPublication(){

    });

    Meteor.methods({

    })
}


/*
Meteor.publish('viewReports', function(user_Id){
    return Reports.find({owner: user_Id});
});

Meteor.publish('viewSingleReport', function(user_Id, text){
    return Reports.find({title: text }, { owner: user_Id });
})
*/