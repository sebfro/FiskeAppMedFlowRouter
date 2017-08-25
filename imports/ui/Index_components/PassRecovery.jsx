import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, FormGroup,
    InputGroup, FormControl, Col } from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

import {englishRecovery, norwegianRecovery} from '../../../lib/pagetext.js';

const T = i18n.createComponent();

export default class PassRecovery extends Component{
    constructor(props){
        super(props);
        if(Session.get('language') === undefined){
            Session.set('language', 'norwegian');
        }
        this.state = {
            show: false,
            sent: false,
            pageText: null,
        }
    }

    setShow(){
        this.setState({
            show: !this.state.show
        })
    }

    async sendEmail(e){
        e.preventDefault();
        let email = $('[name=email2]').val();

       try {
           Meteor.callAsync('sendPassRecoveryLink', email);
           this.setState({
               sent: true
           })
       } catch (err) {
           console.log(err);
           console.log(err.message);
           console.log(err.reason);
       }
        /*
        Meteor.call('sendPassRecoveryLink', email);
        this.setState({
            sent: true
        })
         */
    }

    componentWillMount(){
        if(Session.get('Language') === 'english'){
            this.state.pageText = englishRecovery;
        } else {
            this.state.pageText = norwegianRecovery;
        }
    }


    render(){
        return(
            <div>
                <a onClick={this.setShow.bind(this)}><T>common.passRecovery.forgotPass</T>?</a>
                <Modal
                    show={this.state.show}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <ModalHeader>
                        <ModalTitle id="contained-modal-title">
                            <T>common.passRecovery.forgotPass</T>
                        </ModalTitle>
                    </ModalHeader>
                    <form>
                        <ModalBody>
                            {!this.state.sent ?
                                <FormGroup>
                                    <InputGroup>
                                        <Col smOffset={6} sm={10}>
                                        <p className="errorText" hidden={<T>c</T>}>

                                        </p>
                                        <FormControl
                                            name="email2"
                                            type="email"
                                            label={i18n.__('common.passRecovery.Email')}
                                            placeholder={i18n.__('common.loginform.Email')}
                                        />
                                        </Col>
                                    </InputGroup>
                                </FormGroup>
                                :
                                <p>
                                    <T>common.passRecovery.mailSent</T>
                                </p>
                            }
                        </ModalBody>
                        <ModalFooter>
                            {!this.state.sent ?
                                <Button type="submit" onClick={this.sendEmail.bind(this)}>
                                    Send
                                </Button>
                                : ''
                            }
                            <Button onClick={this.setShow.bind(this)}>
                                <T>common.passRecovery.closeBtn</T>
                            </Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}
