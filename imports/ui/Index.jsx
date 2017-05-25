import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';


import {Reports} from '../api/reports.js';

import Report from './Index_components/Report.jsx';
import AccountsUIWrapper from './AcountsUIWrapper.jsx';

//Index component - represents the whole app
class Index extends Component {



    newReport(event) {
        event.preventDefault();
        FlowRouter.go("/nyRapport");
    }



    renderReports() {
        let reportArray = [];
        for (let i = 0; i < this.props.reports.length; i++) {
            reportArray.push(
                <Report key={i} report={this.props.reports[i]}/>
            );
        }

        return reportArray;
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
                        </div>
                        : ''
                    }
                    <h1>
                        Reports
                    </h1>

                    <AccountsUIWrapper/>

                </header>




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
    Meteor.subscribe('reports', Meteor.userId());
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);