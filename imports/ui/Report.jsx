import React, {Component, PropTypes} from 'react';

import { Reports } from '../api/reports.js';

//Report component - represents a single report
export default class Report extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Reports.update(this.props.report._id, {
            $set: { checked: !this.props.report.checked },
        });
    }

    //foreløpig brukes denne til å slette rapporter
    getReport(){
        Reports.remove(this.props.report._id);
    }

    render() {
        // Give reports a different className when they are checked off,
        // so that we can style them nicely in css
        const reportClassName = this.props.report.checked ? 'checked' : '';

        return (
            <li className={reportClassName}>
                <input
                    type="checkbox"
                    readOnly
                    checked={this.props.report.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                <span className="text">{this.props.report.titel}</span>

                <button className="seeBtn" onClick={this.getReport.bind(this)}>
                    See
                </button>
            </li>
        );
    }
}

Report.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    report: PropTypes.object.isRequired,
};