import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {remoteApp} from "../../../lib/reports";

import {Loading_feedback} from "../Common_components/Loading_feedback"


export default class FacebookLogin extends Component {

    handleLogin(e){
        e.preventDefault();
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, (err) => {
            if (err) {
                console.log('Handle errors here: ', err);
            } else {
                console.log(Meteor.userId());
                console.log(Meteor.user());
                console.log(Meteor.user().profile);
                remoteApp.call('facebook.showMail', Meteor.user(), Meteor.userId());
                FlowRouter.go('/homepage')
            }
        });
    }

    render(){
        return(
            <Button className="btn btn-lg btn-primary btn-block"
                    onClick={this.handleLogin.bind(this)}>
                <span className="fa fa-facebook"/> Login to facebook
            </Button>
        )
    }
}