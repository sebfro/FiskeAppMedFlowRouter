import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Accounts} from 'meteor/accounts-base';
import {
    Button, FormGroup, FormControl, Col, ControlLabel, Form, Checkbox, InputGroup
} from 'react-bootstrap';

import PassRecovery from './Index_components/PassRecovery.jsx';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
        }
    }

    login(e) {
        e.preventDefault();
        let email = $('[name=email]').val();
        let password = $('[name=password]').val();
        let password2 = $('[name=password2]').val();
        let firstName= $('[name=firstname]').val();
        let lastName = $('[name=lastname]').val();
        let phoneNr = $('[name=phoneNr]').val();

        console.log(password2);
        console.log(password);

        console.log(this.state.register);
        if (this.state.register) {
            if(password === password2){
                const user = {
                    email: email,
                    password: password,
                    profile: {
                        lastname: lastName,
                        firstname: firstName,
                        phoneNr: phoneNr
                    }
                };

                Accounts.createUser(user, (err) => {
                    if (err) {
                        alert(err.reason)
                    } else {
                        console.log("User created");
                        FlowRouter.go('/');
                    }
                });
            } else {
                alert("Passwords do not match!");
            }
        } else {
            console.log("Loginwithpassword");
            Meteor.loginWithPassword(email, password, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    FlowRouter.go('/');
                }
            });
        }
    }

    registerUI() {

        if (this.state.register) {
            return (
                <div>
                    <FormGroup>
                        <Col sm={10}>
                            <FormControl
                                name="password2"
                                type="password"
                                placeholder="Repeat password"
                                required={true}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={10}>
                            <FormControl
                                name="firstname"
                                type="text"
                                placeholder="Firstname"
                                required={true}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={10}>
                            <FormControl
                                name="lastname"
                                type="text"
                                placeholder="Lastname"
                                required={true}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={10}>
                            <FormControl
                                name="phoneNr"
                                type="number"
                                placeholder="Phone Number"
                                required={true}/>
                        </Col>
                    </FormGroup>
                </div>
            );
        }
    }

    setRegister(e) {
        e.preventDefault();
        console.log("Setting register");
        this.setState({
            register: !this.state.register
        })
    }

    render() {
        return (
            <div className="wrapper">
                <Form className="form-signin" horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <h2 className="form-signin-heading">
                            {this.state.register ? 'Create account' : 'Sign in'}
                        </h2>
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                name="email"
                                type="email"
                                placeholder="Email"
                                required={true}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col md={10}>
                            <FormControl
                                name="password"
                                type="password"
                                placeholder="Password"
                                required={true}/>
                        </Col>
                    </FormGroup>

                    {this.registerUI()}

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Checkbox>Remember me</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <a onClick={this.setRegister.bind(this)}>Register</a>
                            <PassRecovery/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button className="btn btn-lg btn-primary btn-block" type="submit"
                                    onClick={this.login.bind(this)}>
                                {this.state.register ? 'Create account' : 'Sign in'}
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}