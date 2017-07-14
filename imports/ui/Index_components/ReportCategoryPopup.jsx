import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Button, ButtonGroup, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

import ChooseReportType from './ChooseReportType';

export default class ReportCategoryPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }
    setShow(e){
        e.preventDefault();
        this.setState({
            show: !this.state.show
        });
    }

    render(){
        return (
            <div>
                <Modal
                    show={this.state.show}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <ModalHeader>
                        <ModalTitle id="contained-modal-title">
                            Velg rapport type
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <ChooseReportType/>
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}