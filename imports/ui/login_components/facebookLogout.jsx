import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';
import {clearLocalStorage} from "../../../lib/helpMethods"
import {NavItem} from 'react-bootstrap'

const T = i18n.createComponent();

export default class FBLogout extends Component {
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
    }

    handleFBLogout(e) {
        e.preventDefault();
        FB.getLoginStatus( (res) => {
            if(res && res.status === 'connected'){
                clearLocalStorage();
                FB.logout();
            } else {
                FlowRouter.go('/');
            }
        })
    }

    render() {
        return (
                <NavItem onClick={this.handleFBLogout.bind(this)}>
                    <span className="fa fa-facebook"/> <T>common.navbar.logout</T>
                </NavItem>
        );
    }
}