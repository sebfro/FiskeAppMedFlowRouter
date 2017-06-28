import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Button, ButtonGroup, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, FormGroup,
    InputGroup, FormControl, Overlay, Tooltip } from 'react-bootstrap';

export default class PassRecovery extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            sent: false
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
        console.log(email);

        Accounts.forgotPassword({email: email},function(err){
            console.log(err.reason);
        });
        this.setState({
            sent: true
        })
    }


    render(){
        return(
            <div>
                <Button onClick={this.setShow.bind(this)}>
                    {this.props.pageTextPassRecovery.titel}?
                </Button>
                <Modal
                    show={this.state.show}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <ModalHeader>
                        <ModalTitle id="contained-modal-title">
                            {this.props.pageTextPassRecovery.titel}
                        </ModalTitle>
                    </ModalHeader>
                    <form>
                        <ModalBody>
                            {!this.state.sent ?
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon> @ </InputGroup.Addon>
                                        <p className="errorText" hidden={!this.state.emailErr}>

                                        </p>
                                        <FormControl
                                            name="email2"
                                            type="email"
                                            label="Email address"
                                            placeholder={this.props.pageTextPassRecovery.placeholderEmail}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                :
                                <p>
                                    {this.props.pageTextPassRecovery.message}
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
                                {this.props.pageTextPassRecovery.closeBtn}
                            </Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

PassRecovery.propTypes = {
    pageTextPassRecovery: PropTypes.object.isRequired,
};