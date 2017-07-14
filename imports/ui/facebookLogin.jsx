import React, { Component} from 'react';
import { Button } from 'react-bootstrap';


export default class FBLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loadFbLoginApi() {
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
            js.src = "//connect.facebook.net/nb_NO/sdk.js#xfbml=1&version=v2.9&appId=1865081020422422";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        this.addEvent();
    }

    addEvent(){
        FB.Event.subscribe('auth.login', this.test());
    }
    componentDidMount() {
        this.loadFbLoginApi();
        console.log("Mounted");
    }

    testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            FlowRouter.go('/homepage');
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            console.log("Please log into this app.");
        } else {
            console.log("Please log into this facebook.");
        }
    }

    checkLoginState() {
        FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    handleFBLogin(e) {
        e.preventDefault();
        FB.login(this.checkLoginState());
    }


    test(){
        console.log("hei");
    }

    render() {
        return (
            <div>
                <div className="fb-login-button" data-max-rows="1" data-size="large"
                     data-button-type="login_with" data-show-faces="false"
                     data-auto-logout-link="false" data-use-continue-as="false"
                />
                    <button
                        className="fb-login-button" data-max-rows="1" data-size="large"
                        data-button-type="login_with" data-show-faces="false"
                        data-auto-logout-link="false" data-use-continue-as="true"
                    onClick={this.handleFBLogin.bind(this)}
                >
                    <span className="fa fa-facebook"/> Sign in with Facebook
                </button>

                <p id="status"/>
            </div>
        );
    }
}
