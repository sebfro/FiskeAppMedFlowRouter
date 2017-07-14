import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, FormGroup, FormControl, Col, ControlLabel, Form, Checkbox } from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

import PassRecovery from './Index_components/PassRecovery.jsx';
import {validateEmail, register, login} from '../../lib/loginMethods.js';

const T = i18n.createComponent();


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            emailError: null,
            passError: null,
            fNameError: null,
            lNameError: null,
            phoneError: null
        };
        this.login = this.login.bind(this);
    }

    login(e) {function validateEmail(mail){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (null)
        }

        let msg = mail === "" ? "common.loginform.emptyEmail" : "common.loginform.invalidEmail"

        alert(i18n.__(msg));
        return ('error')
    }
        e.preventDefault();
        let email = $('[name=email]').val();
        let password = $('[name=password]').val();
        let password2 = $('[name=password2]').val();
        let firstName= $('[name=firstname]').val();
        let lastName = $('[name=lastname]').val();
        let phoneNr = $('[name=phoneNr]').val();

        if (this.state.register) {
            register(email, password, password2, firstName, lastName, phoneNr);
            this.setState({
                fNameError: firstName === "" ? 'error' : null,
                lNameError: lastName === "" ? 'error' : null,
                phoneError: phoneNr === "" ? 'error' : null,
            })
        } else {
            login(email, password);
        }

        let validEmail = validateEmail(email);
        let passErr = !this.state.register ? (password === "" || validEmail === null ? 'error' : null) :
            (password === password2 && password !== "" && password2 !== "" ? null : 'error');
        this.setState({
            emailError: validEmail,
            passError: passErr,
        });
    }

    registerUI() {

        if (this.state.register) {
            return (
                <div>
                    <FormGroup validationState={this.state.passError}>
                        <Col sm={10}>
                            <FormControl
                                name="password2"
                                type="password"
                                placeholder={i18n.__('common.loginform.passRep')}
                                required={true}/>
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>

                    <FormGroup validationState={this.state.fNameError}>
                        <Col md={10}>
                            <FormControl
                                name="firstname"
                                type="text"
                                placeholder={i18n.__('common.loginform.firstname')}
                                required={true}/>
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>

                    <FormGroup validationState={this.state.lNameError}>
                        <Col md={10}>
                            <FormControl
                                name="lastname"
                                type="text"
                                placeholder={i18n.__('common.loginform.lastname')}
                                required={true}/>
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>

                    <FormGroup validationState={this.state.phoneError}>
                        <Col md={10}>
                            <FormControl
                                name="phoneNr"
                                type="number"
                                placeholder={i18n.__('common.loginform.phoneNr')}
                                required={true}/>
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>
                </div>
            );
        }
    }

    setRegister(e) {
        e.preventDefault();
        this.setState({
            register: !this.state.register
        })
    }



    render() {
        return (
            <div className="wrapper">
                <Form className="form-signin" horizontal>
                    <FormGroup controlId="formHorizontalEmail" validationState={this.state.emailError}>
                        <h2 className="form-signin-heading">
                            {this.state.register ? <T>common.loginform.createAcc</T> :
                                <T>common.loginform.signIn</T>}
                        </h2>
                        <Col componentClass={ControlLabel} sm={2}>
                            <T>common.loginform.emailLabel</T>
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                name="email"
                                type="email"
                                placeholder={i18n.__('common.loginform.Email')}
                                required={true}/>
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword" validationState={this.state.passError}>
                        <Col componentClass={ControlLabel} sm={2}>
                            <T>common.loginform.passLabel</T>
                        </Col>
                        <Col md={10}>
                            <FormControl
                                name="password"
                                type="password"
                                placeholder={i18n.__('common.loginform.Password')}
                                required={true}/>
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>

                    {this.registerUI()}

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Checkbox><T>common.loginform.remMe</T></Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <a onClick={this.setRegister.bind(this)}><T>common.loginform.register</T></a>
                            <PassRecovery/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button className="btn btn-lg btn-primary btn-block" type="submit"
                                    onClick={this.login.bind(this)}>
                                {this.state.register ? <T>common.loginform.createAcc</T> :
                                    <T>common.loginform.signIn</T>}
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}