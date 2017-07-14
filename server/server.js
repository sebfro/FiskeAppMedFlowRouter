/**
 * Created by sebastian on 21.06.17.
 */
import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base';
import { AccountsServer } from 'meteor/accounts-base';

export const remote = DDP.connect('http://172.16.251.182:3030/');


    Meteor.publish('createUser', function createUser(user, pass2){
        console.log("in createUser");
        if (validateEmail(user.email) && user.profile.firstname !== "" && user.profile.lastname !== "" && user.profile.phoneNr !== "" && user.password === pass2) {
            Accounts.createUser(user);
        }
    });

Meteor.methods({

    "registerUser"(user, pass2){
        console.log(user.email);
        if (validateEmail(user.email) && user.profile.firstname !== "" && user.profile.lastname !== "" && user.profile.phoneNr !== "" && user.password === pass2) {
            Accounts.createUser(user, (err) => {
                if (err) {
                    alert(err.reason)
                } else {
                    Meteor.call('sendVerificationLink', (err, response) => {
                        if(response) {
                            console.log(response);
                        }
                    });
                    FlowRouter.go('/homepage');
                }
            });
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