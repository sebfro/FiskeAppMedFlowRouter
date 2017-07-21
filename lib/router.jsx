import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

import Index from '../imports/ui/Index.jsx';
import SubmitPage from '../imports/ui/SubmitPage.jsx';
import ViewReport from '../imports/ui/ViewReport.jsx';
import StartPage from '../imports/ui/StartPage.jsx';
import LoginScreen from '../imports/ui/LoginScreen.jsx';

import { isLoggedIn } from './helpMethods.js';

//Starter googe maps api og gir den en nøkkel
if(Meteor.isClient){
    Meteor.startup(function(){
        loggedInToFacebook();
        process.UNIVERSE_I18N_LOCALES='all';
        GoogleMaps.load({ key: 'AIzaSyAoNnMKlsuYKXO0t5eY6749sRZ4W_QEVBw'});
        if(localStorage.getItem('language')){
            i18n.setLocale(localStorage.getItem('language'))
        } else {
            i18n.setLocale('nb-NO')
        }

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

        AdminConfig = {
            name: 'My App',
            adminEmails: ['sebastianfroyen@gmail.com']
        };
    });
}

/*export default function newReportValidated(reportTitel, reportId, reportMarkerId){
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
*/

function loggedInToFacebook(){

    console.log("Loading FB API");
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1865081020422422',
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.1' // use version 2.1
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.
        FB.getLoginStatus((res) => {
            return statusChangeCallback(res);
        });
    }.bind(this);

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function statusChangeCallback(res){
    console.log("StatusChangecallback");
    localStorage.setItem('FB.status', res.status);
    localStorage.setItem('FB.loginToken', res.authResponse.accessToken);
    localStorage.setItem('FB.loginTokenExpires', res.authResponse.expiresIn);
    localStorage.setItem('FB.userId', res.authResponse.userID);

}


function checkLoggedIn(context, doRedirect){
    //isVerified();
    console.log("checkLoggedIn");
    console.log(localStorage.getItem('FB.status') !== 'connected');
    console.log('connected');
    console.log("LoggedIn");
    console.log(isLoggedIn());
    console.log(!isLoggedIn() || localStorage.getItem('FB.status') !== 'connected');
    if(!isLoggedIn() && localStorage.getItem('FB.status') !== 'connected'){
        doRedirect('/');
    }

    if (((localStorage.getItem('report.id') === undefined && context.context.path === "/seRapport"))) {
        doRedirect('/homepage');
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
            if(err){
                console.log(err.reason);
                console.log(err.message);
            }
            FlowRouter.go("/homepage");
        });
    }
});

