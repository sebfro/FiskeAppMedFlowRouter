import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Accounts} from 'meteor/accounts-base';
import {
    Button, ButtonGroup, Modal, ModalHeader, ModalTitle, ModalBody,
    ModalFooter, FormGroup, Collapse, InputGroup, FormControl, Overlay,
    Tooltip
} from 'react-bootstrap';

export default class LoginScreen extends Component {

    render() {
        return (
            <div className="wrapper">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please login</h2>
                    <input type="text" className="form-control" name="username" placeholder="Email Address" required="" />
                    <input type="password" className="form-control" name="password" placeholder="Password" required=""/>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                </form>
            </div>
        )
    }
}