import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import Index from '../imports/ui/Index.jsx';
import SubmitPage from '../imports/ui/SubmitPage.jsx';
import ViewReport from '../imports/ui/ViewReport.jsx';
import StartPage from '../imports/ui/StartPage.jsx';

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

export function newReportValidated(){
    if(Meteor.isCordova) {
        cordova.plugins.notification.local.schedule({
            id: 1,
            title: "Message title",
            message: "Message text2",

        });


    }
}

//Disse sender bruker til forskjellige sider.
FlowRouter.route('/', {
    name: "index",
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
    action (){
        ReactLayout.render(SubmitPage);
    }
});

FlowRouter.route('/seRapport',{
    name: "seRapport",
    action (){
        ReactLayout.render(ViewReport);
    }
});

FlowRouter.route('/verify-email/:token',{
    action: function(){
        let token = FlowRouter.getParam("token");
        console.log(token);
        Accounts.verifyEmail(token, function(err){
            FlowRouter.go("/");
        });
    }
});
