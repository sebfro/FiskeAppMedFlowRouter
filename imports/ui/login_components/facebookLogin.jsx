import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';

import {Loading_feedback} from "../Common_components/Loading_feedback"

export default class FBLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loadFbLoginApi() {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1865081020422422',
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: false,  // parse social plugins on this page, if your not using any set it to false, true if you are
                version: 'v2.8' // use version 2.1
            });
        };

        console.log("Loading fb api");
        // Load the SDK asynchronously
        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/nb_NO/sdk.js#xfbml=1&version=v2.9&appId=1865081020422422";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    componentDidMount() {
        this.loadFbLoginApi();
        console.log("Mounted");
    }

    testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me/email', function (response) {
            console.log('Successful login for: ' + response.name);
        });
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            localStorage.setItem('loggedInWith', 'facebook');
            FB.api('/me?fields=name,id,email', function (res) {
                console.log("WEEE");
                localStorage.setItem('FB.name', res.name);
                localStorage.setItem('FB.email', res.email);
                localStorage.setItem('FB.status', response.status);
                localStorage.setItem('FB.loginToken', response.authResponse.accessToken);
                localStorage.setItem('FB.loginTokenExpires', response.authResponse.expiresIn);
                localStorage.setItem('FB.userId', response.authResponse.userID);
                FlowRouter.go('/homepage');
            })
        } else if (response.status === 'not_authorized') {
            console.log("Please log into this app.");
        } else {
            console.log("Please log into this facebook.");
        }
        console.log("Hallo");
    }

    checkLoginState() {
        FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    handleFBLogin(e) {
        e.preventDefault();
        FB.login(this.checkLoginState(), {
            scope: 'email',
            return_scopes: true
        });
    }

    loginButton() {
                return (
                    <div>
                        <Button className="btn btn-lg btn-primary btn-block"
                                onClick={this.handleFBLogin.bind(this)}>
                            <span className="fa fa-facebook"/> Sign in with Facebook
                        </Button>
                    </div>
                )

    }

    render() {
        return (
            <div>
                {this.loginButton()}
            </div>
        );
    }
}

