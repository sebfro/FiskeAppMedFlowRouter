/**
 * Created by Sebastian on 02.06.2017.
 */
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

export function clearLocalStorage(){
    localStorage.removeItem('limit');
    localStorage.removeItem('report.id');
    localStorage.removeItem('error');
    localStorage.removeItem('addedMarker');
    localStorage.removeItem('addMarker');
    localStorage.removeItem('Category');
    localStorage.removeItem('marker.id');
    localStorage.removeItem('FB.loginToken');
    localStorage.removeItem('FB.loginTokenExpires');
    localStorage.removeItem('FB.userId');
    localStorage.removeItem('FB.status');
    localStorage.removeItem('loggedInWith');
}

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

    if(localStorage.getItem('loggedInWith') === 'facebook' && localStorage.getItem('FB.email')){
        return true;
    }

    return Meteor.user().emails[0].verified;
}

export function loggedInToFacebook(){

    console.log("Loading FB API");
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1865081020422422',
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.1' // use version 2.1
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.
        FB.getLoginStatus((res) => {
            return statusChangeCallback(res);
        });
    }.bind(this);

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function statusChangeCallback(res){
    console.log("StatusChangecallback");
    localStorage.setItem('FB.status', res.status);
    localStorage.setItem('FB.loginToken', res.authResponse.accessToken);
    localStorage.setItem('FB.loginTokenExpires', res.authResponse.expiresIn);
    localStorage.setItem('FB.userId', res.authResponse.userID);

}


