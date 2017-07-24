import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

import {isVerified, clearLocalStorage} from '../../../lib/helpMethods.js';
import FlagBtn from "../Common_components/flagButton.jsx";
import FBLogout from '../login_components/facebookLogout.jsx';


const T = i18n.createComponent();

export default class ChooseReportType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            language: Session.get('language'),
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
        alert("Du må verifisere emailen din før du kan sende inn rapporter.");
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
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#myNavbar">
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>

                            <FlagBtn homepage={true}/>

                            <a className="navbar-brand" href="#">
                                <img src="/imrlogomini.png" style={{"height" : "100%", "width" : "30%"}} alt=""/>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a onClick={this.newReportFisk.bind(this)}><T>common.navbar.fishSpecies</T></a>
                                </li>
                                <li><a onClick={this.newReportKoral.bind(this)}><T>common.navbar.coralSpecies</T></a>
                                </li>
                                <li><a
                                    onClick={this.newReportFremmed.bind(this)}><T>common.navbar.unknownSpecies</T></a>
                                </li>
                                <li><a
                                    onClick={this.goToProfilePage.bind(this)}><T>common.navbar.profilePage</T></a>
                                </li>
                                {localStorage.getItem('loggedInWith') === 'facebook' ?
                                    <li><FBLogout/></li> :
                                    <li><a onClick={this.logOut.bind(this)}><T>common.navbar.logout</T></a></li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}