import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, ButtonGroup, Nav, Navbar, ListGroup, Glyphicon } from 'react-bootstrap';


import {Reports} from '../api/reports.js';

import Report from './Index_components/Report.jsx';
import ChooseReportType from './Index_components/ChooseReportType.jsx';
import AccountsUIWrapper from './AcountsUIWrapper.jsx';
import AccountLogin from './Index_components/AccountLogin.jsx';
import { backToIndex } from '../../lib/helpMethods.js';


//Index komponent - Gjengir hovedsiden til applikasjonen
class Index extends Component {



    //Sender bruker til nyrapport siden
    newReport(event) {
        event.preventDefault();
        FlowRouter.go("/nyRapport");
    }


    //Kaller på report komponeneten og gjengir alle rapporter
    renderReports() {
        let reportArray = [];
        for (let i = 0; i < this.props.reports.length; i++) {
            reportArray.push(
                <Report key={i} report={this.props.reports[i]}/>
            );
        }

        return reportArray;
    }

    sendEmail(e){
        e.preventDefault();
        FlowRouter.go('/startPage')
    }

    logOut(e){
        e.preventDefault();
        Meteor.logout();
    }

    pushNotification(e){
        e.preventDefault();
        if(Meteor.isCordova){
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Knap i høyre bel tryyket på",
                message: "Tittelene sier alt",

            });
            cordova.plugin.notification.local.on("click", function(notification){
                console.log("Knap i høyre bel tryyket på");
            })
        }
    }

    render() {
        console.log(Meteor.userId());
        return (
            <div className="container">
                <header>
                    { this.props.currentUser ?
                        <div>
                            <Button className="nyRapportBtn" bsStyle="primary" onClick={this.newReport.bind(this)}>
                                Ny rapport
                            </Button>
                            <Button className="nyRapportBtn" bsStyle="primary" onClick={this.logOut.bind(this)}>
                                Logg ut
                            </Button>
                            <Button bsStyle="primary" onClick={this.pushNotification.bind(this)}>
                                <Glyphicon glyph="align-justify"/>
                            </Button>
                        </div>
                        : <AccountLogin/>
                    }


                    <h1>
                        Rapporter
                    </h1>

                    <AccountsUIWrapper/>

                </header>

                <ChooseReportType/>
                <br/><br/>

                <ListGroup>
                        {this.renderReports()}
                </ListGroup>
            </div>
        )
    }
}

Index.propTypes = {
    reports: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('reports', Meteor.userId());
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);