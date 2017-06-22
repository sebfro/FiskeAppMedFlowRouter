import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Button, ButtonGroup, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, FormGroup,
    InputGroup, FormControl, Overlay, Tooltip } from 'react-bootstrap';


export default class AccountLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            loggedIn: false,
            registrate: false,
            passErr: false,
            emailErr: false
        };
    }

    setShow(e){
        if(e) {
            e.preventDefault();
        }
        this.setState({
            show: !this.state.show
        })
    }

    setPassErr(pErr, eErr){
        this.setState({
            passErr: pErr,
            emailErr: eErr
        })
    }

    setRegistrate(e){
        e.preventDefault();
        this.setState({
            registrate: !this.state.registrate
        })
    }

    login(e){
        e.preventDefault();
        let email = $('[name=email]').val();
        let password = $('[name=password]').val();
        let password2 = $('[name=password2]').val();
        let firstname = $('[name=firstname]').val();
        let lastname = $('[name=lastname]').val();
        let phoneNumber = $('[name=phoneNumber]').val();

        let user = {
            email: $('[name=email]').val(),
            password: $('[name=password]').val()
        };

        if(this.state.registrate) {
            Accounts.createUser( user, (err) => {
                if(err){
                    alert(err.reason);
                } else {
                    Meteor.call('sendVerificationLink', ( err, response) => {
                        if(err){
                            alert(err.reason);
                        } else {
                            alert('Welcome!', 'success');
                        }
                    });
                }
            });
                /*Accounts.createUser({
                    email: email,
                    password: password,
                }, function(err){
                    if(err){
                        console.log(err.reason);
                    }
                });*/
            console.log("Brukeren kommer under");
            console.log(Meteor.user());
            console.log(Meteor.users.find().fetch());
            this.setShow(null);
        } else {
            Meteor.loginWithPassword(email, password, function(err){
                if(err) {
                    console.log(err.reason);
                }
            });
        }
    }

    logOut(e){
        e.preventDefault();
    }

    render(){

        if(!this.state.loggedIn) {
            return (
                <div>
                        <Button className="nyRapportBtn" bsStyle="primary" onClick={this.setShow.bind(this)}>
                            Login
                        </Button>

                        <Modal
                        show= {this.state.show}
                        onHide= {close}
                        container={this}
                        aria-labelledby="contained-modal-title"
                        >

                        <ModalHeader closeButton>
                            <ModalTitle id="contained-modal-title">
                                { !this.state.registrate ?
                                    'Logg inn'
                                    :
                                    'Registrer'
                                }
                            </ModalTitle>
                        </ModalHeader>
                            <form>
                        <ModalBody>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon> @ </InputGroup.Addon>
                                        <p className="errorText" hidden={!this.state.emailErr}>

                                        </p>
                                        <FormControl
                                            name="email"
                                            type="email"
                                            label="Email address"
                                            placeholder="Enter email"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl
                                            name="password"
                                            label="Password"
                                            type="password"
                                            placeholder="Enter password"
                                        />
                                    </InputGroup>
                                </FormGroup>
                            { this.state.registrate ?
                                <div>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                name="password2"
                                                label="Password"
                                                type="password"
                                                placeholder="Enter password"
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                name="firstname"
                                                label="Fornavn"
                                                type="text"
                                                placeholder="Enter firstname"
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                name="lastname"
                                                label="Etternavn"
                                                type="text"
                                                placeholder="Enter lastname"
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                name="phoneNumber"
                                                label="Telefon nummer"
                                                type="number"
                                                placeholder="Enter telefon nummer"
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                : ''
                            }
                            <Button onClick={this.login.bind(this)}>
                                {this.state.registrate ?
                                    'Registrer' : 'Login'
                                }
                            </Button>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" onClick={this.setRegistrate.bind(this)}>
                                {!this.state.registrate ?
                                    'Registrer' : 'Login'
                                }
                            </Button>
                            <Button onClick={this.setShow.bind(this)}>Close</Button>
                        </ModalFooter>
                            </form>
                    </Modal>
                </div>
            );
        } else {
            return(
                <div>
                    <Button className="nyRapportBtn" bsStyle="primary" onClick={this.logOut.bind(this)}>
                        Logg ut
                    </Button>
                </div>
            );
        }
    }

}