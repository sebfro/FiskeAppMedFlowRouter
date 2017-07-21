import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';
import {ListGroup, ListGroupItem, FormGroup, FormControl, Button} from 'react-bootstrap'


import {Reports, remote} from '../../lib/reports.js';
import {Loading_feedback} from './Common_components/Loading_feedback.jsx'




//ProfileReport komponent - Gjengir hovedsiden til applikasjonen
class ProfileReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        if(this.props.currentUser) {
            return (
                <ListGroup fill>
                    <ListGroupItem header="Navn">
                        <p><strong>Navn: </strong> {this.props.currentUser.profile.firstname + " " + this.props.currentUser.profile.lastname}</p>
                        <FormGroup>
                            <FormControl
                                componentClass="input"
                                name=""
                            />
                        </FormGroup>
                    </ListGroupItem>

                    <ListGroupItem header="Telefon nummer">
                        <p><strong>Telefon nummer: </strong> {this.props.currentUser.profile.phoneNr === "" ? <Button bsStyle="primary">Legg til telefon nummer</Button> : this.props.currentUser.profile.phoneNr}</p>
                    </ListGroupItem>

                    <ListGroupItem header="Email">
                        <p><strong>Email: </strong> {this.props.currentUser.emails[0].address}</p>
                        <Button bsStyle="primary">
                            Send verifiserings mail på nytt
                        </Button>
                    </ListGroupItem>

                    <ListGroupItem header="Email">
                        <strong>Navn: </strong> <p> Sebastian Frøyen</p>
                    </ListGroupItem>

                    <ListGroupItem header="Email">
                        <strong>Navn: </strong> <p> Sebastian Frøyen</p>
                    </ListGroupItem>

                    <ListGroupItem header="Email">
                        <strong>Navn: </strong> <p> Sebastian Frøyen</p>
                    </ListGroupItem>

                    <ListGroupItem header="Email">
                        <strong>Navn: </strong> <p> Sebastian Frøyen</p>
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