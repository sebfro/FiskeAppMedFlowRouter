import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, ButtonGroup, Nav, Navbar, NavItem } from 'react-bootstrap';


import {Reports} from '../api/reports.js';


import Report from './Index_components/Report.jsx';
import ChooseReportType from './Index_components/ChooseReportType.jsx';
import AccountsUIWrapper from './AcountsUIWrapper.jsx';
import AccountLogin from './Index_components/AccountLogin.jsx';

export default class StartPage extends Component {


    render(){
        return(
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">
                            <img src="/imrlogo.png" height={20} width={200} alt=""/>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#about">ABOUT</a></li>
                            <li><a href="#services">SERVICES</a></li>
                            <li><a href="#portfolio">PORTFOLIO</a></li>
                            <li><a href="#pricing">PRICING</a></li>
                            <li><a href="#contact">CONTACT</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}