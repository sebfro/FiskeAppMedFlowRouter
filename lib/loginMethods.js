/**
 * Created by sebastian on 13.07.17.
 */
import i18n from 'meteor/universe:i18n';
import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base';

import {remote, remoteCreateUser} from './reports.js'


export function validateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (null)
    }

    let msg = mail === "" ? "common.loginform.emptyEmail" : "common.loginform.invalidEmail"

    alert(i18n.__(msg));
    return ('error')
}

export function register(email, pass, pass2, fName, lName, pNr){


    if(fName !== "" && lName !== "" && pNr !== "" && pass === pass2){
        const user = {
            email: email,
            password: pass,
            profile: {
                lastname: lName,
                firstname: fName,
                phoneNr: pNr
            }
        };

        /*Accounts.createUser(user, (err) => {
            if (err) {
                alert(err.reason)
            } else {
                remote.call('sendVerificationLink', (err, response) => {
                    if(response) {
                        alert(response);
                        alert('En email har blitt sendt til din epost for verifisering!', 'success');
                    }
                });
                FlowRouter.go('/homepage');
            }
        });*/

        let usercreated = remoteCreateUser.subscribe("createUser", user, pass2);
        if (usercreated) {
            console.log(usercreated);
            console.log("usercreated");
        }
    } else if( pass !== pass2 ){
        alert("Passwords do not match!");
    }
}

export function login (email, password){
    Meteor.loginWithPassword(email, password, function (err) {
        if (err) {
            console.log(err.reason);
            console.log(err);
            if(err.reason === "Incorrect password"){
                alert(i18n.__("common.loginform.incorrectPass"));
            }
            if(err.reason === "You have entered an invalid email address!"){
                alert(i18n.__("common.loginform.invalidEmail"));
            }
        } else {
            FlowRouter.go('/homepage');
        }
    });
    //remote.call("loginUser", email, password)
}