import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import Index from '../imports/ui/Index.jsx';
import SubmitPage from '../imports/ui/SubmitPage.jsx';
import ViewReport from '../imports/ui/ViewReport.jsx';
import StartPage from '../imports/ui/StartPage.jsx';
import LoginScreen from '../imports/ui/LoginScreen.jsx';

import { isLoggedIn, isVerified } from './helpMethods.js';

//Starter googe maps api og gir den en nøkkel
if(Meteor.isClient){
    Meteor.startup(function(){
        GoogleMaps.load({ key: 'AIzaSyAoNnMKlsuYKXO0t5eY6749sRZ4W_QEVBw'});

        if(Meteor.isCordova) {
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "App omstartet",
                message: "Ekstra info.",

            });
            cordova.plugin.notification.local.on("click", function(notification){
                console.log("Clicked notification");
            })

        }
    });
}

export default function newReportValidated(reportTitel, reportId, reportMarkerId){
    if(Meteor.isCordova) {
        console.log("Sending notification");
        cordova.plugins.notification.local.schedule({
            id: 1,
            title: reportTitel + " har blitt oppdatert",
            message: "Rapporten er validert.",

        });
        console.log("Notification sent");

        console.log("Notification follow up complete");


    }
}

function checkLoggedIn(context, doRedirect){
    //isVerified();
    if(!isLoggedIn() || (Session.get('report.id') === undefined && context.context.path === "/seRapport")){
        doRedirect('/')
    }
}

//Disse sender bruker til forskjellige sider.
FlowRouter.route('/homepage', {
    name: "homepage",
    triggersEnter: checkLoggedIn,
    action (){
        ReactLayout.render(Index);
    }
});

FlowRouter.route('/startPage', {
    name: "startPage",
    action (){
        ReactLayout.render(StartPage);
    }
});

FlowRouter.route('/nyRapport',{
    name: "nyRapport",
    triggersEnter: checkLoggedIn,
    action (){
        ReactLayout.render(SubmitPage);
    }
});

FlowRouter.route('/seRapport',{
    name: "seRapport",
    triggersEnter: checkLoggedIn,
    action (){
        ReactLayout.render(ViewReport);
    }
});

FlowRouter.route('/', {
    name: "loginScreen",
    action(){
        ReactLayout.render(LoginScreen);
    }
});

FlowRouter.route('/verify-email/:token',{
    action: function(){
        let token = FlowRouter.getParam("token");
        Accounts.verifyEmail(token, function(err){
            FlowRouter.go("/");
        });
    }
});

