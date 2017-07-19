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

function statusChangeCallback(res){
    console.log("StatusChangecallback");
    console.log(res);
    console.log("Hei");console.log("Hei");
}

function loggedInToFacebook(){
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
            this.statusChangeCallback(res);
        });
    }.bind(this);

    console.log("Hei");

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    console.log("HeiHei");
}


export function loadFbLoginApiOnLoad(){
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1865081020422422',
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use version 2.1
        });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function(d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function loadFbLoginApi() {

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1865081020422422',
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use version 2.1
        });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function(d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    console.log(checkIfLoggedInWithFb());
}

function checkIfLoggedInWithFb(){
    let tmp = "";
    FB.getLoginStatus(function(res){
        tmp = res.status;
    });
    if(tmp === 'connected'){
        localStorage.setItem('loggedInWith', 'facebook');
        console.log("Logget inn");
    }
    console.log('connected');
}


