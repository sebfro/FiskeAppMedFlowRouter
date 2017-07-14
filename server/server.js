/**
 * Created by sebastian on 21.06.17.
 */
import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base';
import { AccountsServer } from 'meteor/accounts-base';

export const remote = DDP.connect('http://172.16.251.182:3030/');

if (Meteor.isServer) {
    Meteor.startup( function() {
        let username = encodeURIComponent("sebastianfroyen@gmail.com");
        let pass = encodeURIComponent("Rhkwxexty69");
        let domain = "smtp.gmail.com";
        let port = 587;
        process.env.MAIL_URL="smtp://" + username + ":" + pass + "@" + domain + ":" + port;
    })
}

    Meteor.publish('createUser', function createUser(user, pass2){
        console.log("in createUser");
        if (validateEmail(user.email) && user.profile.firstname !== "" && user.profile.lastname !== "" && user.profile.phoneNr !== "" && user.password === pass2) {
            try{
                Accounts.createUser(user);
                remote.call('sendVerificationLink', this.userId);
                return true;
            } catch (e){
                return false;
            }

        }
    });

Meteor.methods({

    "registerUser"(user, pass2){
        console.log("registerUser");
        if (validateEmail(user.email) && user.profile.firstname !== "" && user.profile.lastname !== "" && user.profile.phoneNr !== "" && user.password === pass2) {
            try{
                Accounts.createUser(user);
                validationEmail(Meteor.userId);
                return true;
            } catch (e){
                console.log(e);
                console.log("error");
                return false;
            }
        }
    },

    "loginUser"(email, pass){
        Meteor.loginWithPassword(email, pass, function (err) {
            if (err) {
                console.log(err.reason);
                console.log(err);
            } else {
                FlowRouter.go('/homepage');
            }
        });
    }
});

function validateEmail(mail){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}

function validationEmail(user){
    console.log("Sending mail");
    let userId = user ? user : Meteor.userId();

    if(userId){
        return Accounts.sendVerificationEmail(userId);
    }
}