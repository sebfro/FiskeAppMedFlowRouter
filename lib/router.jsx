import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import {mount} from 'react-mounter';
import Index from '../imports/ui/Index.jsx';
import SubmitPage from '../imports/ui/SubmitPage.jsx';
import ViewReport from '../imports/ui/ViewReport.jsx';
import StartPage from '../imports/ui/StartPage.jsx';
import LoginScreen from '../imports/ui/LoginScreen.jsx';
import {MainLayout} from '../imports/ui/MainLayout.jsx';
import ProfilePage from '../imports/ui/ProfilePage.jsx';
import About from '../imports/ui/about.jsx';

import { isLoggedIn } from './helpMethods.js';
import ChooseReportType from "../imports/ui/Index_components/ChooseReportType";
import NavbarBackBtn from "../imports/ui/Common_components/navbarBackBtn.jsx";
import {remoteApp} from "./reports";

//Starter googe maps api og gir den en nøkkel
if(Meteor.isClient){
    Meteor.startup(function(){
        process.UNIVERSE_I18N_LOCALES='all';
        GoogleMaps.load({ key: 'AIzaSyAoNnMKlsuYKXO0t5eY6749sRZ4W_QEVBw'});
        if(localStorage.getItem('language')){
            i18n.setLocale(localStorage.getItem('language'))
        } else {
            i18n.setLocale('nb-NO')
        }

        /*if(Meteor.isCordova) {
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "App omstartet",
                message: "Ekstra info.",

            });
            cordova.plugin.notification.local.on("click", function(notification){
                console.log("Clicked notification");
            })

        }*/

        AdminConfig = {
            name: 'My App',
            adminEmails: ['sebastianfroyen@gmail.com']
        };

        Push.Configure({
            android: {
                senderId: 151119787186,
                alert: true,
                badge: true,
                sound: true,
                vibrate: true,
                clearNotifications: true,
                // icon: '',
                // iconColor: ''
            }
        });

        /*
            Push.Configure({
                android: {
                    senderID: 151119787186,
                    alert: true,
                    badge: true,
                    sound: true,
                    vibrate: true,
                    clearNotifications: true,
                    icon: 'imrlogomini.png',
                    // iconColor: ''
                },
            });

            Push.addListener('token', (token) => {
                PUSH_TOKEN = token;
                remoteApp.call('raix:push-update', {
                    appName: 'myApp',
                    token: token,
                    userId: ''
                });
            });

        Push.send({
            from: 'test',
            title: 'hello',
            text: 'World',
            query: {}
        });
        */
    });
}



function checkLoggedIn(context, doRedirect){
    if(!isLoggedIn() && localStorage.getItem('FB.status') !== 'connected'){
        doRedirect('/');
    }

    if (((localStorage.getItem('report.id') === undefined && context.context.path === "/seRapport"))) {
        doRedirect('/homepage');
    }
}

function renderMainLayout(component){
    mount(MainLayout, {
        header: <NavbarBackBtn/>,
        content: component,
    })
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

FlowRouter.route('/profil',{
    name: "Profil",
    triggersEnter: checkLoggedIn,
    action(){
        renderMainLayout(<ProfilePage/>)
    }
});

FlowRouter.route('/about',{
    name: "About",
    triggersEnter: checkLoggedIn,
    action(){
        renderMainLayout(<About/>)
    }
});

FlowRouter.route('/_oauth/facebook?close', {
    name: "facebookLogin",
    triggersEnter: checkLoggedIn,
    action(){
        FlowRouter.go("/homepage");
    }
});