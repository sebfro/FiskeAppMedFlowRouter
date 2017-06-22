import React, {Component, PropTypes} from 'react';
import { Button, ButtonGroup, Navbar, NavbarBrand, NavItem, Nav} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';

import {isVerified} from '../../../lib/helpMethods.js';

export default class ChooseReportType extends Component{

    newReportFisk(e){
        e.preventDefault();
        if(isVerified()){
            Session.set('Category', "fiskeArt");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            alert("Du må verifisere emailen din før du kan sende inn rapporter.");
        }
    }

    newReportKoral(e){
        e.preventDefault();
        if(isVerified()){
            Session.set('Category', "koral");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            alert("Du må verifisere emailen din før du kan sende inn rapporter.");
        }

    }

    newReportFremmed(e){
        e.preventDefault();
        if(isVerified()) {
            Session.set('Category', "fremmedArt");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            alert("Du må verifisere emailen din før du kan sende inn rapporter.");
        }
    }

    setSession(){
        console.log("Marker has been set");
        Session.set('addMarker', true);
    }

    render(){
        if(Meteor.userId()) {
            /*return(
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">IMR</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        hei
                    </Nav>
                    <Nav>
                        reportButton
                    </Nav>
                </Navbar>
            )*/
            return (
                <div>
                    <ButtonGroup className='category' bsSize="large" bsStyle="primary" >
                        <Button bsStyle="primary" onClick={this.newReportFisk.bind(this)}>
                            Fiske Art
                        </Button>
                        <Button bsStyle="primary" onClick={this.newReportKoral.bind(this)}>
                            Koral
                        </Button>
                        <Button bsStyle="primary" onClick={this.newReportFremmed.bind(this)}>
                            Fremmed Art
                        </Button>
                    </ButtonGroup>
                </div>
            )
        } else {
            return null;
        }
    }
}