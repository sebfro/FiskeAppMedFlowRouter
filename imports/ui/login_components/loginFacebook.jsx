import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

import {errorMsgBool} from "../Common_components/Loading_feedback"

const T = i18n.createComponent();

export default class FacebookLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginError: false
        }
    }

    async handleLogin(e){
        e.preventDefault();
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, (err) => {
            if (err) {
                console.log('Handle errors here: ', err.message);
                console.log(err.reason);
                this.setState({
                    loginError: true
                })
            } else {
                try {
                    Meteor.callAsync('facebook.showMail');
                    localStorage.setItem('loggedInWith', 'facebook');
                    FlowRouter.go('/homepage')
                } catch (err) {
                    this.setState({
                        loginError: true
                    });
                    console.log(err);
                    console.log(err.reason);
                    console.log(err.message);
                }

                /*
                Meteor.call('facebook.showMail', (err, res) =>{
                    if(err){
                        console.log(err.message);
                        console.log(err.reason);
                    } else {
                        console.log(res.message);
                        console.log(res.reason);
                    }
                });
                localStorage.setItem('loggedInWith', 'facebook');
                FlowRouter.go('/homepage')
                 */
            }
        });
    }

    render(){
        return(
            <div>
                {errorMsgBool(<T>common.loginform.fbLoginError</T>, this.state.loginError)}
                <Button className="btn btn-lg btn-primary btn-block"
                        onClick={this.handleLogin.bind(this)}>
                    <span className="fa fa-facebook"/> <T>common.loginform.fbLoginBtn</T>
                </Button>
            </div>
        )
    }
}