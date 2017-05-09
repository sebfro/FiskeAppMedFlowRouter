import React, {Component, PropTypes} from 'react';

import {Meteor} from 'meteor/meteor';
import ShowImg from "./ShowImg";


//Report component - represents a single report
export default class Report extends Component {

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Meteor.call('reports.setChecked', this.props.report._id, !this.props.report.checked);
    }

    deleteReport() {
        Meteor.call('reports.remove', this.props.report._id);
    }

    //foreløpig brukes denne til å slette rapporter
    setShow() {
        Meteor.call('reports.setShow', this.props.report._id, !this.props.report.show);
    }

    renderImg(){
        return this.props.report.photo.map((img) => (
            <ShowImg key={img._id} img={img}/>
        ));
    }

    render() {
        // Give reports a different className when they are checked off,
        // so that we can style them nicely in css
        const reportClassName = this.props.report.checked ? 'checked' : '';

        if (Meteor.userId() === this.props.report.owner) {
            return (

                <div>

                <li onClick={this.setShow.bind(this)}>


                    <span className="text">{this.props.report.titel}</span>

                    <button className="seeBtn" onClick={this.deleteReport.bind(this)}>
                        Delete
                    </button>
                </li>

                    {this.props.report.show ?

                        <ul>
                            <li>
                                {this.props.report.kommentar}
                            </li>
                            <li>
                                {this.props.report.lengde}
                            </li>
                            <li>
                                {this.renderImg()}
                            </li>
                        </ul>
                        : ''}



                </div>
            );
        } else {
            return null;
        }
    }
}

Report.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    report: PropTypes.object.isRequired,
};