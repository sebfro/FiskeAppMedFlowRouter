import React, {Component, PropTypes} from 'react';

import { Meteor } from 'meteor/meteor';

let showRest = false;

//Report component - represents a single report
export default class Report extends Component {

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Meteor.call('reports.setChecked', this.props.report._id, !this.props.report.checked);
    }

    deleteReport(){
        Meteor.call('reports.remove', this.props.report._id);
    }

    //foreløpig brukes denne til å slette rapporter
    getReport(){
        Meteor.call('reports.setShow', this.props.report._id, !this.props.report.show);
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
                    Se
                </button>

                <button className="seeBtn" onClick={this.deleteReport.bind(this)}>
                    Delete
                </button>

                {this.props.report.show ?

                <ul>
                    <li>
                        {this.props.report.kommentar}
                    </li>
                    <li>
                        {this.props.report.lengde}
                    </li>
                    <li>
                        {this.props.report.owner}
                    </li>
                </ul>

                    : ''}
            </li>
        );
    }
}

Report.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    report: PropTypes.object.isRequired,
};