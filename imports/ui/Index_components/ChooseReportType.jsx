import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

import {isVerified} from '../../../lib/helpMethods.js';
import FlagBtn from "./flagButton.jsx";


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
        Session.set('addMarker', true);
    }

    logOut(e) {
        e.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');
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

                                <FlagBtn/>

                                <a className="navbar-brand" href="#">
                                    <img src="/imrlogo.png" height={20} width={200} alt=""/>
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
                                    <li><a onClick={this.logOut.bind(this)}><T>common.navbar.logout</T></a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                </div>
            );
    }
}