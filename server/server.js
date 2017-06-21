/**
 * Created by sebastian on 21.06.17.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


if(Meteor.isServer){
    Meteor.publish('userData', function() {
        if(this.userId){
            return Meteor.users.find({ _id: this.userId }, {
                fields: { other: 1, things: 1 }
            });
        } else {
            this.ready();
        }
    });
}
/*
if (Meteor.isServer) {
    process.env.MAIL_URL="smtp://sebastianfroyen%40gmail.com:Rhkwxexty69@smtp.gmail.com:800/";

    console.log("Email blir kjørt");
    Email.send({
        from: "sebastianfroyen@gmail.com",
        to: "h144975@hib.no",
        subject: "Meteor can send emails via gmail",
        text: "Dette er teksten",
    });
    console.log("Email sending er ferdig");
}
*/