import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Button, ButtonGroup, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, FormGroup,
    InputGroup, FormControl, Overlay, Tooltip, Col } from 'react-bootstrap';

import {englishRecovery, norwegianRecovery} from '../../../lib/pagetext.js';
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

    sendEmail(e){
        e.preventDefault();
        let email = $('[name=email2]').val();
        Meteor.call('sendPassRecoveryLink', email);
        this.setState({
            sent: true
        })
    }

    componentWillMount(){
        if(Session.get('Language') === 'english'){
            this.state.pageText = englishRecovery;
        } else {
            this.state.pageText = norwegianRecovery;
        }
    }


    render(){
        /*
         <Button onClick={this.setShow.bind(this)}>
         {this.state.pageTextPassRecovery.titel}?
         </Button>
         */
        return(
            <div>
                <a onClick={this.setShow.bind(this)}>{this.state.pageText.titel}?</a>
                <Modal
                    show={this.state.show}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <ModalHeader>
                        <ModalTitle id="contained-modal-title">
                            {this.state.pageText.titel}
                        </ModalTitle>
                    </ModalHeader>
                    <form>
                        <ModalBody>
                            {!this.state.sent ?
                                <FormGroup>
                                    <InputGroup>
                                        <Col smOffset={6} sm={10}>
                                        <p className="errorText" hidden={!this.state.emailErr}>

                                        </p>
                                        <FormControl
                                            name="email2"
                                            type="email"
                                            label="Email address"
                                            placeholder={this.state.pageText.placeholderEmail}
                                        />
                                        </Col>
                                    </InputGroup>
                                </FormGroup>
                                :
                                <p>
                                    {this.state.pageText.message}
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
                                {this.state.pageText.closeBtn}
                            </Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}
