import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonGroup, Nav, Navbar, NavItem, Collapse, Image} from 'react-bootstrap';


import {Reports} from '../../lib/reports.js';


import Report from './Index_components/Report.jsx';
import ChooseReportType from './Index_components/ChooseReportType.jsx';
import AccountsUIWrapper from './AcountsUIWrapper.jsx';
import AccountLogin from './Index_components/AccountLogin.jsx';
import LoginScreen from './LoginScreen';

export default class StartPage extends Component {
//<span className="glyphicon glyphicon-arrow-right"/>

    backToIndex(e) {
        e.preventDefault();
        FlowRouter.go("/homepage");
    }

    render() {
        let backBtnStyle = {
            float: 'right',
            paddingTop: 14,
            paddingRight: 24,
        };
        return (
            <div>

                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">

                            <button type="button" className="btn btn-link" style={backBtnStyle} aria-hidden="true" onClick={this.backToIndex.bind(this)}>
                                <span className="glyphicon glyphicon-arrow-right"/>
                            </button>

                            <a className="navbar-brand">
                                <img src="/imrlogo.png" height={20} width={200} alt=""/>
                            </a>
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}