/**
 * Created by sebastian on 21.06.17.
 */
import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base';

export const remote = DDP.connect('http://172.16.251.182:3030/');
export const remoteApp = DDP.connect('http://172.16.251.182:3000/');

if (Meteor.isServer) {
    Meteor.startup( function() {
        let username = encodeURIComponent("sebastianfroyen@gmail.com");
        let pass = encodeURIComponent("Rhkwxexty69");
        let domain = "smtp.gmail.com";
        let port = 587;
        process.env.MAIL_URL="smtp://" + username + ":" + pass + "@" + domain + ":" + port;

        ServiceConfiguration.configurations.remove({
            service: "facebook"
        });

        ServiceConfiguration.configurations.insert({
            service: "facebook",
            appId: '1865081020422422',
            secret: 'bdd2aa5d0567a4796a1dd7c5c3d8ef67'
        });
    });

    AdminConfig = {
        name: 'My App',
        adminEmails: ['sebastian17pepp@gmail.com']
    };

    Meteor.publish('facebook.Email', function() {
        console.log("YYYYYYYYYYYYYY");
        console.log(Meteor.user().services.facebook.email);
        return Meteor.users.find({_id: this.userId}, {fields: {'services.facebook.email': 1}});
    })
}



Meteor.methods({

    "sendVerificationEmail"(userId){
        console.log("Sending email");
        let id = userId;
        Accounts.sendVerificationEmail(userId);
        console.log("done");
    },

    "facebook.showMail"(user, userId){
        console.log("facebook.showMail");
        console.log(Meteor.userId());
        const user2 = Meteor.users.findOne(userId);
        console.log(user);
        console.log(user2);
        let options = {
            email: user2.services.facebook.email,
        };

        Meteor.users.update(userId, {
            $push: { profile : options}
        })
    }
});