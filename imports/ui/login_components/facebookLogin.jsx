import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';


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
                xfbml: true,  // parse social plugins on this page
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
            FlowRouter.go('/homepage');
            FB.api('/me', function(res){
                localStorage.setItem('name', res.name);
                console.log(res);
            })
        } else if (response.status === 'not_authorized') {
            console.log("Please log into this app.");
        } else {
            console.log("Please log into this facebook.");
        }
    }

    checkLoginState() {
        FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    handleFBLogin(e) {
        e.preventDefault();
        FB.login(this.checkLoginState(), {
            scope: 'email'
        });
    }

    render() {
        return (
            <div>
                <Button bsStyle="primary" onClick={this.handleFBLogin.bind(this)}>
                    <span className="fa fa-facebook"/> Sign in with Facebook
                </Button>


                <p id="status"/>

            </div>
        );
    }
}

