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
            <div>
                <Navbar>
                    <Nav>
                        <NavItem>
                            Test
                        </NavItem>
                        <NavItem>
                            Test
                        </NavItem>
                        <NavItem>
                            Test
                        </NavItem>
                        <NavItem>
                            Test
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}