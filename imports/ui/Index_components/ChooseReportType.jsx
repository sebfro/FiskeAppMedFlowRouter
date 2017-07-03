import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

import {isVerified} from '../../../lib/helpMethods.js';
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
            Session.set('Category', "Fiske art");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }
    }

    newReportKoral(e) {
        e.preventDefault();
        if (isVerified()) {
            Session.set('Category', "Koral");
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
            Session.set('Category', "Fremmed art");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }
    }

    setSession() {
        console.log("Marker has been set");
        Session.set('addMarker', true);
    }

    logOut(e) {
        e.preventDefault();
        Meteor.logout();
        FlowRouter.go('/login');
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

                                {this.props.flagBtn}

                                <a className="navbar-brand" href="#">
                                    <img src="/imrlogo.png" height={20} width={200} alt=""/>
                                </a>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a onClick={this.newReportFisk.bind(this)}>{this.props.pageTextNav.fish}</a>
                                    </li>
                                    <li><a onClick={this.newReportKoral.bind(this)}>{this.props.pageTextNav.coral}</a>
                                    </li>
                                    <li><a
                                        onClick={this.newReportFremmed.bind(this)}>{this.props.pageTextNav.unknown}</a>
                                    </li>
                                    <li><a onClick={this.logOut.bind(this)}>{this.props.pageTextNav.logOut}</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                </div>
            );
    }
}

ChooseReportType.propTypes = {
    pageTextNav: PropTypes.object.isRequired,
    flagBtn: PropTypes.object.isRequired,
};