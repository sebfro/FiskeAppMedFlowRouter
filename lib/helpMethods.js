/**
 * Created by Sebastian on 02.06.2017.
 */
import {Meteor} from 'meteor/meteor';
//Sjekk om string har tall i seg
export function hasNumbers(s){
    let regex = /\d/g;
    return regex.test(s);
}
//Sender bruker tilbake til hovedsiden
export function backToIndex(event){
    event.preventDefault();
    FlowRouter.go("index");
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
    console.log(Meteor.userId());
    return !! Meteor.userId();
}

export function isVerified(){
    console.log("isVerified: ");
    console.log(Meteor.user());
    /*if(isLoggedIn()) {
        return Meteor.user().emails[0].verified;
    } else {
        return false;
    }*/
}