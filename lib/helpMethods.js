/**
 * Created by Sebastian on 02.06.2017.
 */
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

//Sjekk om string har tall i seg
export function hasNumbers(s){
    let regex = /\d/g;
    return regex.test(s);
}
//Sender bruker tilbake til hovedsiden
export function backToIndex(event){
    event.preventDefault();
    FlowRouter.go("homepage");
}

export function dataURItoBlob(dataURI){
    //Convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if(dataURI.split(',')[0].indexOf('base64') >= 0){
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
        //seperate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        //write the bytes of the string to a typed array
        let imgContent = new Uint8Array(byteString.length);
        for( let i = 0; i < byteString.length; i++) {
            imgContent[i] = byteString.charCodeAt(i);
        }
        return new Blob([imgContent], {type:mimeString});
}

export function isLoggedIn(){
    return !! Meteor.userId();
}

export function isVerified(){
    return Meteor.user().emails[0].verified;
    /*if(isLoggedIn()) {
        return Meteor.user().emails[0].verified;
    } else {
        return false;
    }*/
}

export function validateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (null)
    }
    alert(i18n.__("common.loginform.invalidEmail"));
    return ('error')
}