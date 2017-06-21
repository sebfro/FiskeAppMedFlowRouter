import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, ButtonGroup } from 'react-bootstrap';


import {Reports} from '../api/reports.js';

import Report from './Index_components/Report.jsx';
import ChooseReportType from './Index_components/ChooseReportType.jsx';
import AccountsUIWrapper from './AcountsUIWrapper.jsx';
import AccountLogin from './Index_components/AccountLogin.jsx';

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
        Meteor.call('sendAEmail');
    }

    render() {
        console.log("hei");
        console.log(this.props.reports);
        return (
            <div className="container">
                <header>
                    { this.props.currentUser ?
                        <div>
                            <Button className="nyRapportBtn" bsStyle="primary" onClick={this.newReport.bind(this)}>
                                Ny rapport
                            </Button>
                            <AccountLogin/>
                            <Button className="nyRapportBtn" bsStyle="primary" onClick={this.sendEmail.bind(this)}>
                                Send Email
                            </Button>
                        </div>
                        : ''
                    }
                    <h1>
                        Rapporter
                    </h1>

                    <AccountsUIWrapper/>

                </header>

                <ChooseReportType/>

                <ul>
                    {this.renderReports()}
                </ul>
            </div>
        )
    }
}

Index.propTypes = {
    reports: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('report', Meteor.userId());
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);