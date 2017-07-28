import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Nav, Navbar, NavItem, NavbarBrand} from 'react-bootstrap';
import FlagBtn from './flagButton.jsx';

import {isVerified, clearLocalStorage} from '../../../lib/helpMethods.js';
import FBLogout from '../login_components/facebookLogout.jsx';

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
            localStorage.setItem('Category', 'Fiske art');
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
            navigator.notification.alert("You must verify your email first.", () => {
                console.log('notverified utført');}, 'Invalid email', 'Ok')
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
                            <img src="/imrlogomini.png" style={{"height": "30%", "width": "10%"}} alt="imr logo"/>

                        </NavbarBrand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem onClick={this.newReportFisk.bind(this)}>
                                    Fiske art
                                </NavItem>
                                <NavItem onClick={this.newReportFremmed.bind(this)}>
                                    Fremmed art
                                </NavItem>
                                <NavItem onClick={this.newReportKoral.bind(this)}>
                                    Korall
                                </NavItem>
                            </Nav>
                            <Nav pullRight>
                                <NavItem onClick={this.goToProfilePage.bind(this)}>
                                    Profil
                                </NavItem>
                                <FlagBtn loginScreen={true}/>
                                {localStorage.getItem('loggedInWith') === 'faccebook' ?
                                    <NavItem onClick={this.logOut.bind(this)}>
                                        Logout
                                    </NavItem> : <FBLogout/>
                                }
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