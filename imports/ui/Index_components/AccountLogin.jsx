import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Button, ButtonGroup, Modal, ModalHeader, ModalTitle, ModalBody,
    ModalFooter, FormGroup, Collapse, InputGroup, FormControl, Overlay,
    Tooltip } from 'react-bootstrap';

import PassRecovery from './PassRecovery.jsx';

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
                            alert('En email har blitt sendt til din epost for verifisering!', 'success');
                        }
                    });
                }
            });
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
                            {this.props.pageTextLogin.loginBtn}
                        </Button>

                        <Modal
                        show= {this.state.show}
                        onHide= {close}
                        container={this}
                        aria-labelledby="contained-modal-title"
                        >

                        <ModalHeader>
                            <ModalTitle id="contained-modal-title">
                                {this.props.pageTextLogin.loginBtn}
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
                                            placeholder={this.props.pageTextLogin.placeholderEmail}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl
                                            name="password"
                                            label="Password"
                                            type="password"
                                            placeholder={this.props.pageTextLogin.placeholderPass}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            <Collapse in={this.state.registrate}>
                                <div>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                name="password2"
                                                label="Password"
                                                type="password"
                                                placeholder={this.props.pageTextLogin.placeholderPass}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                name="firstname"
                                                label="Fornavn"
                                                type="text"
                                                placeholder={this.props.pageTextLogin.placeholderFname}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                name="lastname"
                                                label="Etternavn"
                                                type="text"
                                                placeholder={this.props.pageTextLogin.placeholderLname}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                name="phoneNumber"
                                                label="Telefon nummer"
                                                type="number"
                                                placeholder={this.props.pageTextLogin.placeholderPhoneNr}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                            </Collapse>

                            <Button onClick={this.login.bind(this)}>
                                {this.state.registrate ?
                                    this.props.pageTextLogin.registerbtn : this.props.pageTextLogin.loginBtn
                                }
                            </Button>
                            <br/><br/>
                            <PassRecovery pageTextPassRecovery={this.props.pageTextPassRecovery}/>

                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" onClick={this.setRegistrate.bind(this)}>
                                {!this.state.registrate ?
                                    this.props.pageTextLogin.registerbtn : this.props.pageTextLogin.loginBtn
                                }
                            </Button>
                            <Button onClick={this.setShow.bind(this)}>
                                {this.props.pageTextLogin.closeBtn}
                            </Button>
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

AccountLogin.propTypes = {
    pageTextLogin: PropTypes.object.isRequired,
    pageTextPassRecovery: PropTypes.object.isRequired
};