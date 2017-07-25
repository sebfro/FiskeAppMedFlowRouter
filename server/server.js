/**
 * Created by sebastian on 21.06.17.
 */
import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base';

export const remote = DDP.connect('http://172.16.251.182:3030/');
export const remoteApp = DDP.connect('http://172.16.251.182:3000/');

if (Meteor.isServer) {
    Meteor.startup(function () {
        let username = encodeURIComponent("sebastianfroyen@gmail.com");
        let pass = encodeURIComponent("Rhkwxexty69");
        let domain = "smtp.gmail.com";
        let port = 587;
        process.env.MAIL_URL = "smtp://" + username + ":" + pass + "@" + domain + ":" + port;

        ServiceConfiguration.configurations.remove({
            service: "facebook"
        });

        ServiceConfiguration.configurations.insert({
            service: "facebook",
            appId: '1865081020422422',
            secret: 'bdd2aa5d0567a4796a1dd7c5c3d8ef67'
        });

        if(Meteor.isCordova) {
            Push.Configure({
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
                }
                // production: true,
                // 'sound' true,
                // 'badge' true,
                // 'alert' true,
                // 'vibrate' true,
                // 'sendInterval': 15000, Configurable interval between sending
                // 'sendBatchSize': 1, Configurable number of notifications to send per batch
                // 'keepNotifications': false,
//
            });
        }
    });

    AdminConfig = {
        name: 'My App',
        adminEmails: ['sebastianfroyen@gmail.com']
    };

    Meteor.publish('facebook.Email', function () {
        console.log("YYYYYYYYYYYYYY");
        console.log(Meteor.user().services.facebook.email);
        return Meteor.users.find({_id: this.userId}, {fields: {'services.facebook.email': 1}});
    })
}


Meteor.methods({

    "sendVerificationEmail"(userId) {
        console.log("Sending email");
        let id = userId;
        Accounts.sendVerificationEmail(userId);
        console.log("done");
    },

    "facebook.showMail"(user, userId) {
        console.log("facebook.showMail");
        console.log(Meteor.userId());
        const user2 = Meteor.users.findOne(userId);
        console.log(user);
        console.log(user2);


        let setObject = {};
        //let emailPath = "email";
        let fNamePath = "lastname";
        let lNamePath = "firstname";
        setObject[fNamePath] = user2.services.facebook.first_name;
        setObject[lNamePath] = user2.services.facebook.last_name;
        //setObject[emailPath] = user2.services.facebook.email;


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
        }
    },

    'changeProfileName'(fName, lName, userId) {
        user = Meteor.users.findOne(userId);

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

    'changeProfileEmail'(email, userId) {
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

    'changeProfilePhoneNr'(pNr, userId) {
        user = Meteor.users.findOne(userId);

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