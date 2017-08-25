import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, FormGroup, FormControl, Col, ControlLabel, Form, Checkbox} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

import PassRecovery from './Index_components/PassRecovery.jsx';
import {
    validateEmail,
    validatePass,
    validatePhoneNr,
    validateName,
    register,
    passMatch
} from '../../lib/loginMethods.js';
import {errorMsg} from "./Common_components/Loading_feedback"
import FlagBtn from './Common_components/flagButton.jsx';
import FacebookLogin from './login_components/loginFacebook.jsx';

const T = i18n.createComponent();


const error = 'error';
const pass = '123Fiskeri';


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            emailError: null,
            passError: null,
            fNameError: null,
            lNameError: null,
            phoneError: null,
            loginErr: '',
            passMatch: null,
            emailValue: localStorage.getItem('rememberMe') === '1' ? localStorage.getItem('email') : null,
            handleRemMe: localStorage.getItem('rememberMe') === '1'
        };
        this.login = this.login.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRemMe = this.handleRemMe.bind(this);
    }

    setStateForInput(password, password2, firstName, lastName, phoneNr) {
        this.setState({
            //passError: validatePass(password),
            fNameError: validateName(firstName),
            lNameError: validateName(lastName),
            phoneError: validatePhoneNr(phoneNr),
            //passMatch: passMatch(password2, password) ? null : error,
        })
    }

    async login(e) {
        e.preventDefault();

        let email = $('[name=email]').val();
        //let password = $('[name=password]').val();
        //let password2 = $('[name=password2]').val();
        let firstName = $('[name=firstname]').val();
        let lastName = $('[name=lastname]').val();
        let phoneNr = $('[name=phoneNr]').val();

        if (this.state.register) {
            console.log('register');
            let errors = register(email, /*password, password2,*/ firstName, lastName, phoneNr);
            console.log('register ferdig');

            console.log(errors);

            if (errors === null) {
                const user = {
                    email: email,
                    password: pass,
                    profile: {
                        lastname: lastName,
                        firstname: firstName,
                        phoneNr: phoneNr
                    }
                };
                Accounts.createUser(user, (err) => {
                    if (err) {
                        console.log(err.reason);
                        let loginErr = '';
                        let emailErr = null;
                        if (err.reason === "Email already exists.") {
                            loginErr = i18n.__("common.loginform.emailExist");
                            emailErr = error;
                        }
                        this.setState({
                            loginErr: loginErr,
                            emailError: emailErr
                        });
                        this.setStateForInput(/*password, password2,*/ firstName, lastName, phoneNr);
                    } else {
                        try {
                            Meteor.callAsync('sendVerificationEmail');
                            if (Meteor.isCordova) {
                                navigator.notification.alert(i18n.__('common.alertMessages.emailVerification'), () => {
                                    console.log('notverified utført');
                                }, i18n.__('common.alertMessages.emailSent'), 'Ok')
                            } else {
                                alert(i18n.__('common.alertMessages.emailSent'));
                            }
                        } catch (err) {
                            //couldnotsendemail
                            if (Meteor.isCordova) {
                                navigator.notification.alert(i18n.__('common.alertMessages.couldnotsendemail'), () => {
                                    console.log('notverified utført');
                                }, i18n.__('common.alertMessages.couldnotsendemail'), 'Ok')
                            } else {
                                alert(i18n.__('common.alertMessages.couldnotsendemail'));
                            }
                            console.log(err);
                            console.log(err.reason);
                            console.log(err.message);
                        }
                        /*
                        Meteor.call('sendVerificationEmail', (err, response) => {
                            if (response) {
                                alert(response);
                                alert('En email har blitt sendt til din epost for verifisering!', 'success');
                            } else if (err) {
                                console.log(err.reason);
                                console.log(err.message);
                            }
                        });
                         */
                        localStorage.setItem('email', email);
                        if(this.state.handleRemMe){
                            localStorage.setItem('rememberMe', '1');
                        } else {
                            localStorage.setItem('rememberMe', '0');
                        }
                        FlowRouter.go('/homepage');
                    }
                });
            } else {
                let validMail = validateEmail(email);

                this.setState({
                    loginErr: i18n.__(validMail === null ? '' : email === "" ? "common.loginform.emptyEmail" : "common.loginform.invalidEmail"),
                    emailError: validMail

                });
                this.setStateForInput(/*password, password2,*/ firstName, lastName, phoneNr);

            }
        } else {
            Meteor.loginWithPassword(email, pass, (err) => {
                Accounts._autoLoginEnabled = true;
                if (err) {
                    console.log(err.reason);
                    this.setState({
                        loginErr: i18n.__(err.reason === 'User not found' ? "common.loginform.userNotFound" : err.reason === 'Incorrect password' ? "common.loginform.incorrectPass" :
                            err.reason === 'Match failed' ? "common.loginform.noMailError" : ''),
                        //passError: err.reason === 'Incorrect password' ? error : null,
                        emailError: err.reason === 'User not found' /*? error : err.reason === 'Incorrect password'*/ ? 'success' : null
                    });
                } else {
                    localStorage.setItem('email', email);
                    if(this.state.handleRemMe){
                        localStorage.setItem('rememberMe', '1');
                    } else {
                        localStorage.setItem('rememberMe', '0');
                    }
                    localStorage.setItem('Meteor.loginTokenExpires', null);
                    FlowRouter.go('/homepage');
                }
            });
        }
    }


    passValid() {
        return (this.state.passError || this.state.passMatch) === null ? null : error;
    }

    registerUI() {

        if (this.state.register) {
            return (
                <div>
                    {/*
                    <FormGroup controlId="formHorizontalPassword" validationState={this.passValid()}>
                        <Col sm={10}>
                            <FormControl
                                componentClass="input"
                                name="password2"
                                type="password"
                                placeholder={i18n.__('common.loginform.passRep')}
                            />
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>
                    */}
                    <FormGroup validationState={this.state.fNameError}>
                        {errorMsg(i18n.__('common.loginform.nameError'), this.state.fNameError)}
                        <Col md={10}>
                            <FormControl
                                componentClass="input"
                                name="firstname"
                                type="text"
                                placeholder={i18n.__('common.loginform.firstname')}
                            />
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>

                    <FormGroup validationState={this.state.lNameError}>
                        {errorMsg(i18n.__('common.loginform.nameError'), this.state.lNameError)}
                        <Col md={10}>
                            <FormControl
                                componentClass="input"
                                name="lastname"
                                type="text"
                                placeholder={i18n.__('common.loginform.lastname')}
                            />
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>

                    <FormGroup validationState={this.state.phoneError}>
                        {errorMsg(i18n.__('common.loginform.phoneError'), this.state.phoneError)}
                        <Col md={10}>
                            <FormControl
                                componentClass="input"
                                name="phoneNr"
                                type="number"
                                pattern="^\d{4}-\d{3}-\d{4}$"
                                placeholder={i18n.__('common.loginform.phoneNr')}
                            />
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

    handleEmailChange(e){
        this.setState({emailValue: e.target.value});
    }

    handleRemMe(e){
        this.setState({handleRemMe: !this.state.handleRemMe})
    }

    render() {
        console.log("Is push enabled");
        console.log(Push.enabled());
        return (
            <div className="wrapper">
                <Form className="form-signin" horizontal>
                    <FormGroup>
                        <h2 className="form-signin-heading" style={{float: 'left'}}>
                            {this.state.register ? <T>common.loginform.createAcc</T> :
                                <T>common.loginform.signIn</T>}
                        </h2>
                        <FlagBtn loginScreen={false}/>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" validationState={this.state.emailError}>
                        {errorMsg(this.state.loginErr, error)}
                        <Col md={10}>
                            <ControlLabel><T>common.loginform.emailLabel</T></ControlLabel>
                            <FormControl
                                componentClass="input"
                                name="email"
                                value={this.state.emailValue}
                                onChange={this.handleEmailChange}
                                type="email"
                                placeholder={i18n.__('common.loginform.Email')}
                                required={true}/>
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>

                    {/*
                    <FormGroup controlId="formHorizontalPassword" validationState={this.passValid()}>

                        {this.state.register ?
                            <div>
                                {errorMsg(i18n.__('common.loginform.passError'), this.state.passError)}
                                {errorMsg(i18n.__('common.loginform.passMatchError'), this.state.passMatch)}
                            </div>
                            : null}
                        <Col md={10}>
                            <ControlLabel><T>common.loginform.passLabel</T></ControlLabel>
                            <FormControl
                                componentClass="input"
                                name="password"
                                type="password"
                                placeholder={i18n.__('common.loginform.Password')}
                                required={true}/>
                            <FormControl.Feedback/>
                        </Col>
                    </FormGroup>
                    */}

                    {this.registerUI()}

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                {this.state.handleRemMe ?
                                    <Checkbox onClick={this.handleRemMe} checked><T>common.loginform.remMe</T></Checkbox>
                                    :
                                    <Checkbox onClick={this.handleRemMe}><T>common.loginform.remMe</T></Checkbox>}

                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <a onClick={this.setRegister.bind(this)}><T>common.loginform.register</T></a>

                            </Col>
                        </FormGroup>
                    <Button className="btn btn-lg btn-primary btn-block" type="submit"
                            onClick={this.login.bind(this)}>
                        {this.state.register ? <T>common.loginform.createAcc</T> :
                            <T>common.loginform.signIn</T>}
                    </Button>
                    <FacebookLogin/>
                </Form>
            </div>
        )
    }
}