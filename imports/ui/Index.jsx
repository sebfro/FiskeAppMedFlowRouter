import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Reports} from '../api/reports.js';

import Report from './Report.jsx';
import AccountsUIWrapper from './AcountsUIWrapper.jsx';

//Index component - represents the whole app
class Index extends Component {
    newReport() {
        console.log("Ny rapport");
        console.debug("Ny rapport");
    }

    renderReports() {

        return this.props.reports.map((report) => (
            <Report key={report._id} report={report}/>
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>
                        Results
                    </h1>
                    <button className="nyRapportBtn" onClick={this.newReport.bind(this)}>
                        Ny rapport
                    </button>

                    <AccountsUIWrapper/>

                </header>

                { this.props.currentUser ?
                    <ul>
                        {this.renderReports()}
                    </ul> : ''
                }
            </div>
        )
    }
}

Index.propTypes = {
    reports: PropTypes.array.isRequired,
    currentUser: PropTypes.object,

};

export default createContainer(() => {
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);