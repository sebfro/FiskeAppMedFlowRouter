import React, {Component, PropTypes} from 'react';
import { Button, ButtonGroup, ButtonToolbar, Navbar,
    NavbarBrand, NavItem, Nav, Collapse} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';

import {isVerified} from '../../../lib/helpMethods.js';

export default class ChooseReportType extends Component{
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
        })
    }

    newReportFisk(e){
        e.preventDefault();
        if(isVerified()){
            Session.set('Category', "Fiske art");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }
    }

    newReportKoral(e){
        e.preventDefault();
        if(isVerified()){
            Session.set('Category', "Koral");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }

    }

    notVerified(){
        alert("Du må verifisere emailen din før du kan sende inn rapporter.");
    }

    newReportFremmed(e){
        e.preventDefault();
        if(isVerified()) {
            Session.set('Category', "Fremmed art");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }
    }

    setSession(){
        console.log("Marker has been set");
        Session.set('addMarker', true);
    }

    render(){
        if(Meteor.userId()) {
            return(
                <div>
                    <Nav bsStyle="pills" justified>
                        <NavItem onClick={this.setShow.bind(this)}>
                            Ny Rapport
                        </NavItem>
                    </Nav>
                        <Collapse in={this.state.show}>
                            <Nav bsStyle="pills" justified>
                                <NavItem onClick={this.newReportFisk.bind(this)}>
                                    Fiske Art
                                </NavItem>
                                <NavItem onClick={this.newReportKoral.bind(this)}>
                                    Koral
                                </NavItem>
                                <NavItem onClick={this.newReportFremmed.bind(this)}>
                                    Fremmed Art
                                </NavItem>
                            </Nav>
                        </Collapse>
                </div>
            )
            /*return (
                <div>
                    <ButtonGroup justified className='category' bsSize="large" bsStyle="primary" >
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
            )*/
        } else {
            return null;
        }
    }
}