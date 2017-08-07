import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Nav, Navbar, NavItem, NavbarBrand} from 'react-bootstrap';
import FlagBtn from './flagButton.jsx';
import i18n from 'meteor/universe:i18n';

import {isVerified, clearLocalStorage} from '../../../lib/helpMethods.js';

const T = i18n.createComponent();

export default class NavBar extends Component {
//<span className="glyphicon glyphicon-arrow-right"/>
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            language: Session.get('language'),
            emailVerified: true,
        }
    }


    newReportFisk(e) {
        e.preventDefault();
        if (isVerified()) {
            localStorage.setItem('Category', "Fiske art");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }
    }

    newReportKoral(e) {
        e.preventDefault();
        if (isVerified()) {
            localStorage.setItem('Category', "Koral");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }

    }


    notVerified() {
        this.setState({
            emailVerified: true,
        });
        if (Meteor.isCordova) {
            navigator.notification.alert(i18n.__('common.alertMessages.verifyEmail'), () => {
                console.log('notverified utført');}, i18n.__('common.alertMessages.invalidEmail'), 'Ok')
        }
    }

    newReportFremmed(e) {
        e.preventDefault();
        if (isVerified()) {
            localStorage.setItem('Category', "Fremmed art");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }
    }

    setSession() {
        localStorage.setItem('addMarker', true);
    }

    logOut(e) {
        e.preventDefault();
        clearLocalStorage();
        Meteor.logout();
        FlowRouter.go('/');
    }

    goToProfilePage(e){
        e.preventDefault();
        FlowRouter.go('/profil')
    }

    render() {
        return (
            <div>
                <Navbar fixedTop={true}>
                    <Navbar.Header>
                    <NavbarBrand>
                            <img src="/hiLogoBig.png" style={{"height": "auto", "maxHeight": "50px", "width": "200px"}} alt="imr logo"/>
                        </NavbarBrand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem onClick={this.newReportFisk.bind(this)}>
                                    <T>common.navbar.fishSpecies</T>
                                </NavItem>
                                <NavItem onClick={this.newReportFremmed.bind(this)}>
                                    <T>common.navbar.unknownSpecies</T>
                                </NavItem>
                                <NavItem onClick={this.newReportKoral.bind(this)}>
                                    <T>common.navbar.coralSpecies</T>
                                </NavItem>
                            </Nav>
                            <Nav pullRight>
                                <NavItem onClick={this.goToProfilePage.bind(this)}>
                                    <T>common.navbar.profilePage</T>
                                </NavItem>
                                <FlagBtn loginScreen={true}/>
                                <NavItem onClick={this.logOut.bind(this)}>
                                    <T>common.navbar.logout</T>
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

/*
                        <Nav pullright>
                            <NavItem type="button" className="btn btn-link" style={backBtnStyle} aria-hidden="true"
                                    onClick={this.backToIndex.bind(this)}>
                                <span className="glyphicon glyphicon-arrow-right"/>
                            </NavItem>
                        </Nav>
 */