import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import {ListGroup, ListGroupItem, FormGroup, FormControl, Button, Form, ButtonToolbar} from 'react-bootstrap'

const T = i18n.createComponent();

export default class About extends Component {
    render(){
        return (
            <ListGroup fill>
                <ListGroupItem>
                    <h3>Hva brukes rapprteringene til?</h3>
                    <p>Alle rapporteringer som blir sendt inn via denne applikasjonen vil public
                    sendt til forskerne hos HI for validering. Forskerne vil ha tilgang til brukers
                    email og kan sende en email hvis rapporteringen viser seg å være interessant.
                    </p>
                </ListGroupItem>
                <ListGroupItem>
                    <h3>Hvordan brukes personlig info</h3>
                    <p>Alle rapporteringer som blir sendt inn via denne applikasjonen vil public
                        sendt til forskerne hos HI for validering. Forskerne vil ha tilgang til brukers
                        email og kan sende en email hvis rapporteringen viser seg å være interessant.
                    </p>
                </ListGroupItem>
                <ListGroupItem>
                    <h3>Placeholder</h3>
                    <p>Alle rapporteringer som blir sendt inn via denne applikasjonen vil public
                        sendt til forskerne hos HI for validering. Forskerne vil ha tilgang til brukers
                        email og kan sende en email hvis rapporteringen viser seg å være interessant.
                    </p>
                </ListGroupItem>
            </ListGroup>
        );
    }
}