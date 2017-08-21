/**
 * Created by sebastian on 21.06.17.
 */
import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';
import {remote} from "../lib/reports";


if (Meteor.isServer) {
    Meteor.startup(function () {
        let username = encodeURIComponent("sebastianfroyen@gmail.com");
        let pass = encodeURIComponent("Rhkwxexty69");
        let domain = "smtp.gmail.com";
        let port = 587;
        process.env.MAIL_URL = "smtp://" + username + ":" + pass + "@" + domain + ":" + port;
/*
        ServiceConfiguration.configurations.remove({
            service: "facebook"
        });

        ServiceConfiguration.configurations.insert({
            service: "facebook",
            appId: '1865081020422422',
            secret: 'bdd2aa5d0567a4796a1dd7c5c3d8ef67'
        });
*/
        ServiceConfiguration.configurations.upsert({
            service: 'facebook'
        },{
            $set: {
                appId: '1865081020422422',
                loginStyle: "popup",
                secret: 'bdd2aa5d0567a4796a1dd7c5c3d8ef67'
            }
        });
        /*
            Push.Configure({
                /*
                    apn: {
                    certData: Assets.getText('apnDevCert.pem'),
                    keyData: Assets.getText('apnDevKey.pem'),
                    passphrase: 'xxxxxxxxx',
                    production: true,
                    //gateway: 'gateway.push.apple.com',
                },

                gcm: {
                    apiKey: 'AAAAIy9w9LI:APA91bEO7j-6mJ3kBYCJ_YYf-sn8wkxmCLd7Ikicnl7eh_wgzHUPrZTxbvrmjcNUowZCm03GXkJpGK5LUYp7sptPSCGT9n1wAhw_sGsYI3UptsyyKOalYMsHF_vFTQwe9_dVTdf1S7yb',
                    projectNumber: 151119787186
                },

                fcm: {
                    apiKey: 'AAAAIy9w9LI:APA91bEO7j-6mJ3kBYCJ_YYf-sn8wkxmCLd7Ikicnl7eh_wgzHUPrZTxbvrmjcNUowZCm03GXkJpGK5LUYp7sptPSCGT9n1wAhw_sGsYI3UptsyyKOalYMsHF_vFTQwe9_dVTdf1S7yb',
                    projectNumber: 151119787186
                },

                production: false,
                sound: true,
                badge: true,
                alert: true,
                vibrate: true,
                // 'sendInterval': 15000, Configurable interval between sending
                // 'sendBatchSize': 1, Configurable number of notifications to send per batch
                // 'keepNotifications': false,
//
            });

        Push.allow({
            send: function(userId, notification) {
                return true; // Allow all users to send
            }
        });
        */
    });

    AdminConfig = {
        name: 'My App',
        adminEmails: ['sebastianfroyen@gmail.com']
    };

    Meteor.publish('facebook.Email', function () {
        return Meteor.users.find({_id: this.userId}, {fields: {'services.facebook.email': 1}});
    });

    Meteor.publish('test', ()=>{
        console.log(this.userId);
        console.log(this.userId());
        return remote.subscribe('reports.reportingToolList', this.userId, 10);
    });

    console.log("På server");

    Accounts.config({
        loginExpirationInDays: null
    });
}


Meteor.methods({

    /*'serverNotification': function(text, title){
        console.log('serverNotification');
        let badge = 1;
        Push.send({
            from: 'Test',
            title: 'Hello',
            text: 'World',
            badge: 1,

            query: {
                //this will send to all users
            }
        });
        console.log("serverNotification har blitt utført");
    },

    'userNotification': function(text, title, userId) {
        console.log('userNotification');
        let badge = 1;
        Push.send({
            from: 'Test',
            title: 'Hello',
            text: 'World',
            badge: badge,
            payload: {
                title: title,
                text: text,
            },
            query: {
                userId: userId
            }
        });
        console.log('ferdig i userNotification');
    },

    "notify"(userId){
        console.log('in notify');
        Push.send({
            from: 'IMR',
            title: 'Verifisert rapport',
            text: 'Denne rapporten har blitt verifisert',
            badge: 1,
            query: {
                userId: userId
            }
        });
    },*/

    'testUserId'(){

        console.log(this.userId);
        console.log(Meteor.userId());
    },

    'reports.insert'(titelText, lengdeNr, img, posLat, posLong,
                     depthInput, amountInput, useCurrPos, category, date, mail, brukerId){

        console.log("her kommer bruker");
        console.log(user);
        const user = Meteor.users.findOne(Meteor.userId());

        console.log(user);

        let userMail;

        if(user.services.facebook){
            userMail = user.services.facebook.email;
        } else {
            userMail = user.emails[0].address;
        }

        console.log("");
        console.log("Her kommer emailen");
        console.log(userMail);

        titelText = titelText.charAt(0).toUpperCase() + titelText.slice(1);

        remote.call("reports.insert", titelText, lengdeNr, img, posLat, posLong,
            depthInput, amountInput, useCurrPos, category, date, userMail, Meteor.userId());
    },

    "sendVerificationEmail"() {
        Accounts.sendVerificationEmail(Meteor.userId());
    },

    'facebook.showMail'() {
        console.log("facebook.showMail");
        console.log(Meteor.userId());
        userId = Meteor.userId();
        const user2 = Meteor.users.findOne(Meteor.userId());
        console.log(user2);


        let setObject = {};
        //let emailPath = "email";
        let fNamePath = "firstname";
        let lNamePath = "lastname";
        setObject[fNamePath] = user2.services.facebook.first_name;
        setObject[lNamePath] = user2.services.facebook.last_name;
        //setObject[emailPath] = user2.services.facebook.email;

        console.log("Fornavn " + user2.services.facebook.first_name);
        console.log("Etternavn" + user2.services.facebook.last_name);


        let setObject2 = {};
        let addressPath = 'address';
        let verifiedPath = 'verified';
        setObject2[addressPath] = user2.services.facebook.email;
        setObject2[verifiedPath] = true;

        let emails = [setObject2];

        try {
            Meteor.users.update(userId, {
                $set: {profile: setObject, emails}
            })
        } catch (e) {
            console.log(e.message);
            console.log("Meteor.users.update, fikk error");
        }
    },

    'changeProfileName'(fName, lName) {
        let userId = Meteor.userId();
        let user = Meteor.users.findOne(userId);

        let setObject = {};
        let fNamePath = "firstname";
        let lNamePath = "lastname";
        let phoneNrPath = "phoneNr";
        setObject[fNamePath] = fName;
        setObject[lNamePath] = lName;
        setObject[phoneNrPath] = user.profile.phoneNr;

        try {

            Meteor.users.update(userId, {
                $set: {profile: setObject}
            })
        } catch (e) {
            console.log(e.message);
        }
    },

    'changeProfileEmail'(email) {
        let userId = Meteor.userId();
        let setObject2 = {};
        let addressPath = 'address';
        let verifiedPath = 'verified';
        setObject2[addressPath] = email;
        setObject2[verifiedPath] = false;

        let emails = [setObject2];

        try {

            Meteor.users.update(userId, {
                $set: {emails}
            })
        } catch (e) {
            console.log(e.message);
        }
    },

    'changeProfilePhoneNr'(pNr) {
        let userId = Meteor.userId();
        let user = Meteor.users.findOne(userId);

        let setObject = {};
        let fNamePath = "firstname";
        let lNamePath = "lastname";
        let phoneNrPath = "phoneNr";
        setObject[fNamePath] = user.profile.firstname;
        setObject[lNamePath] = user.profile.lastname;
        setObject[phoneNrPath] = pNr;

        try {
            Meteor.users.update(userId, {
                $set: {profile: setObject}
            })
        } catch (e) {
            console.log(e.message);
        }
    }
});