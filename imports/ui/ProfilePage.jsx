import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';
import {ListGroup, ListGroupItem, FormGroup, FormControl, Button, Form, ButtonToolbar} from 'react-bootstrap'
import {validateEmail, validatePhoneNr, validateName} from "../../lib/loginMethods"
import {errorMsg} from "./Common_components/Loading_feedback";

import {Loading_feedback} from './Common_components/Loading_feedback.jsx';

const style = {inline: true};
const T = i18n.createComponent();


//ProfileReport komponent - Gjengir hovedsiden til applikasjonen
class ProfileReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editName: false,
            editEmail: false,
            editPhone: false,
            nameError: null,
            emailError: null,
            phoneError: null,
            showPopup: false,
            fNameError: null,
            lNameError: null
        };
    }

    async verify(e) {
        e.preventDefault();
        /*
        Meteor.call('sendVerificationEmail', () => {
            if (Meteor.isCordova) {
                navigator.notification.alert(i18n.__('common.alertMessages.emailVerification'), () => {
                    console.log('notverified utført');
                }, i18n.__('common.alertMessages.emailSent'), 'Ok')
            }
        })
         */

        try {
            await Meteor.callAsync('sendVerificationEmail');
            if (Meteor.isCordova) {
                navigator.notification.alert(i18n.__('common.alertMessages.emailVerification'), () => {
                    console.log('notverified utført');
                }, i18n.__('common.alertMessages.emailSent'), 'Ok')
            } else {
                alert(i18n.__('common.alertMessages.emailSent'));
            }
        } catch (err) {
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
    }

    async setEditName(e) {
        e.preventDefault();
        if (this.state.editName) {
            let fName = $('[name=firstname]').val();
            let lName = $('[name=lastname]').val();
            let fNameErr = validateName(fName);
            let lNameErr = validateName(lName);

            let err = fNameErr === 'error' || lNameErr === 'error' ? 'error' : null;
            this.setState({nameError: err});
            if (err !== 'error') {
                /*
                Meteor.call('changeProfileName', fName, lName);
                this.setState({editName: !this.state.editName})
                 */
                try {
                    await Meteor.callAsync('changeProfileName', fName, lName);
                    this.setState({editName: !this.state.editName})
                } catch (err){
                    if (Meteor.isCordova) {
                        navigator.notification.alert(i18n.__('common.alertMessages.profileNameError'), () => {
                        }, i18n.__('common.alertMessages.alertBodyTryAgain'), 'Ok')
                    } else {
                        alert(i18n.__('common.alertMessages.profileNameError'));
                    }
                    console.log(err);
                    console.log(err.reason);
                    console.log(err.message);
                }
            } else if (fName === '' && lName === '') {
                this.setState({
                    editName: !this.state.editName,
                    nameError: null,
                })
            }
        } else {
            this.setState({editName: !this.state.editName})
        }
    }

    cancelSetEditName(e){
        e.preventDefault();
        this.setState({editName: !this.state.editName})
    }

    async setEditEmail(e) {
        e.preventDefault();
        if (this.state.editEmail) {
            let mail = $('[name=email]').val();
            let err = validateEmail(mail);
            console.log(err);
            this.setState({
                emailError: err
            });
            if (err !== 'error') {

                try {
                    await Meteor.callAsync('changeProfileEmail', mail);
                    this.setState({
                        editEmail: !this.state.editEmail
                    })
                } catch (err) {
                    if (Meteor.isCordova) {
                        navigator.notification.alert(i18n.__('profileEmailError'), () => {
                        }, i18n.__('alertBodyTryAgain'), 'Ok');
                    } else {
                        confirm(i18n.__('profileEmailError'));
                    }
                }
                /*
                try {
                    Meteor.call('changeProfileEmail', mail);
                } catch(err) {
                    if (Meteor.isCordova) {
                        navigator.notification.alert("Kunne ikke opppdatere email", () => {
                        }, "Kunne ikke oppdatere email2", 'Ok');
                    } else {
                        confirm("Denne er kun for testing i nettleser. Trykk OK for å gå videre!");
                    }
                }
                Meteor.call('changeProfileEmail', mail);
                this.setState({
                    editEmail: !this.state.editEmail
                })
                */
            } else if (mail === '') {
                this.setState({
                    editEmail: !this.state.editEmail,
                    emailError: null,

                })
            }
        } else {
            this.setState({editEmail: !this.state.editEmail})
        }
    }

    cancelSetEditEmail(e){
        e.preventDefault();
        this.setState({editEmail: !this.state.editEmail})
    }

    async setEditPhone(e) {
        e.preventDefault();
        if (this.state.editPhone) {
            let change = true;
            let phoneNr = $('[name=phoneNr]').val();
            let err = validatePhoneNr(phoneNr);
            phoneNr === '' ? change = false : null;
            this.setState({
                phoneError: err
            });
            console.log(err);
            console.log(phoneNr);
            console.log(err !== 'error');
            if (err !== 'error' && change) {
                try {
                    await Meteor.callAsync('changeProfilePhoneNr', phoneNr);
                    this.setState({
                        editPhone: !this.state.editPhone
                    })
                } catch (err) {
                    if (Meteor.isCordova) {
                        navigator.notification.alert(i18n.__('profilePhoneNrError'), () => {
                        }, i18n.__('alertBodyTryAgain'), 'Ok');
                    } else {
                        confirm(i18n.__('profilePhoneNrError'));
                    }
                    console.log(err);
                    console.log(err.message);
                    console.log(err.reason);
                }
                /*
                Meteor.call('changeProfilePhoneNr', phoneNr);
                this.setState({
                    editPhone: !this.state.editPhone
                })
                 */
            } else if (phoneNr === '') {
                this.setState({
                    editPhone: !this.state.editPhone,
                    phoneError: null,
                })
            }
        } else {
            this.setState({editPhone: !this.state.editPhone})
        }
    }

    cancelSetEditPhone(e){
        e.preventDefault();
        this.setState({editPhone : !this.state.editPhone})
    }

    render() {
        if (this.props.currentUser) {
            return (
                <ListGroup fill>
                    <ListGroupItem header={i18n.__('common.profilePageError.name')}>
                        <p>
                            <strong><T>common.profilePageError.name</T>:
                            </strong> {this.props.currentUser.profile.firstname + " " + this.props.currentUser.profile.lastname}
                        </p>

                        {this.state.editName ?
                            <Form>
                                    {errorMsg(i18n.__('common.profilePageError.errorName'), this.state.nameError)}
                                    <FormGroup controlId="formInlineName" validationState={this.state.fNameError}>
                                        <FormControl
                                            type="text"
                                            placeholder={i18n.__('common.profilePageError.firstname')}
                                            componentClass="input"
                                            name="firstname"
                                        />
                                    </FormGroup>

                                    <FormGroup controlId="formInlineName" validationState={this.state.lNameError}>
                                        <FormControl
                                            type="text"
                                            placeholder={i18n.__('common.profilePageError.lastname')}
                                            componentClass="input"
                                            name="lastname"
                                        />
                                    </FormGroup>
                            </Form>
                            : null}

                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={this.setEditName.bind(this)}>
                                {this.state.editName ? "Ok" : i18n.__('common.profilePageError.change')}
                            </Button>
                            {this.state.editName ?
                                <Button bsStyle="primary" onClick={this.cancelSetEditName.bind(this)}>
                                    {i18n.__('common.profilePageError.cancelBtn')}
                                </Button> : null
                            }
                        </ButtonToolbar>

                    </ListGroupItem>

                    <ListGroupItem header={i18n.__('common.profilePageError.phoneNr')}>

                        {this.props.currentUser.profile.phoneNr === "" ? null :
                            <p><strong><T>common.profilePageError.phoneNr</T>:
                            </strong> {this.props.currentUser.profile.phoneNr} </p>}
                        {this.state.editPhone ?
                            <Form style={style}>
                                {errorMsg(i18n.__('common.profilePageError.errorPhone'), this.state.phoneError)}
                                <FormGroup controlId="formInlineName">
                                    <FormControl
                                        type="number"
                                        placeholder={i18n.__('common.profilePageError.phoneNr')}
                                        componentClass="input"
                                        name="phoneNr"
                                    />
                                </FormGroup>
                            </Form>
                            : null}
                            <ButtonToolbar>
                        {this.props.currentUser.profile.phoneNr === "" ?
                            <Button bsStyle="primary" onClick={this.setEditPhone.bind(this)}><T>common.profilePageError.addPhoneNr</T></Button> :
                            <Button bsStyle="primary"
                                    onClick={this.setEditPhone.bind(this)}>{this.state.editPhone ? 'Ok' : i18n.__('common.profilePageError.change')}</Button>}
                                {this.state.editPhone ? <Button bsStyle="primary" onClick={this.cancelSetEditPhone.bind(this)}><T>common.profilePageError.cancelBtn</T></Button> : null}
                            </ButtonToolbar>
                    </ListGroupItem>

                    <ListGroupItem header={i18n.__('common.profilePageError.email')}>
                        <p><strong>Email: </strong> {this.props.currentUser.emails[0].address}</p>
                        {this.state.editEmail ?
                            <Form style={style}>
                                {errorMsg(i18n.__('common.profilePageError.errorEmail'), this.state.emailError)}
                                <FormGroup controlId="formInlineName">
                                    <FormControl
                                        type="email"
                                        placeholder={i18n.__('common.profilePageError.email')}
                                        componentClass="input"
                                        name="email"
                                    />
                                </FormGroup>
                            </Form>
                            : null}
                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={this.setEditEmail.bind(this)}>
                                {this.state.editEmail ? 'Ok' : i18n.__('common.profilePageError.change')}
                            </Button>
                            {this.state.editEmail ?
                                <Button bsStyle="primary" onClick={this.cancelSetEditEmail.bind(this)}>
                                    {i18n.__('common.profilePageError.cancelBtn')}
                                </Button> : null
                            }
                            {!this.props.currentUser.emails[0].verified ?
                                <Button bsStyle="primary" onClick={this.verify.bind(this)}>
                                    <T>common.profilePageError.sendEmailVerification</T>
                                </Button> : null}
                        </ButtonToolbar>

                    </ListGroupItem>
                </ListGroup>
            )
        } else {
            return (<Loading_feedback/>)
        }

    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, ProfileReport);