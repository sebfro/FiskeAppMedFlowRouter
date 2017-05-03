import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';

import {Reports} from '../api/reports.js';

import Report from './Report.jsx';

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
                    <button onClick={this.newReport.bind(this)}>
                        Ny rapport
                    </button>
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
};

export default createContainer(() => {
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
    };
}, Index);