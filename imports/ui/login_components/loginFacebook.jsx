import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor'

import {Loading_feedback} from "../Common_components/Loading_feedback"


export default class FacebookLogin extends Component {

    handleLogin(e){
        e.preventDefault();
        Meteor.loginWithFacebook((err, res) => {
            if(err){
                console.log("Error");
                console.log(err);
                console.log(err.message);
            } else {
                console.log("Logged in");
                console.log(res);
                console.log(res.reason);
                console.log(res.message);
            }
        })
    }

    render(){
        return(
            <Button onClick={this.handleLogin.bind(this)}>
                Login to facebook
            </Button>
        )
    }
}