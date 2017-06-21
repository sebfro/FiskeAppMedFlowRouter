import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, ButtonGroup, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, FormGroup, InputGroup, FormControl } from 'react-bootstrap';


export default class AccountLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            loggedIn: false
        };
    }

    setShow(e){
        e.preventDefault();
        this.setState({
            show: !this.state.show
        })
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
                                Contained Modal
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon> @ </InputGroup.Addon>
                                        <FormControl
                                            id="email"
                                            type="email"
                                            label="Email address"
                                            placeholder="Enter email"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl
                                            id="password"
                                            label="Password"
                                            type="password"/>
                                    </InputGroup>
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.setShow.bind(this)}>Login</Button>
                            <Button onClick={this.setShow.bind(this)}>Close</Button>
                        </ModalFooter>
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