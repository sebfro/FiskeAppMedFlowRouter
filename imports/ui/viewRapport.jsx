import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import {Reports} from '../api/reports.js';

import Report from './Report.jsx';


class viewRapport extends Component {
    renderReports() {

        return this.props.report.map((r) => (
            <Report key={r._id} report={r}/>
        ));



    }

    backToIndex(event){
        event.preventDefault();
        FlowRouter.go("/");
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Rapport</h1>

                        <button className="nyRapportBtn" onClick={this.backToIndex.bind(this)}>
                            Tilbake
                        </button>
                </header>
                <ul>
                    <li>
                        <h3></h3>
                    </li>
                    <li>
                        <p>Lengde: 30 cm</p>
                    </li>
                    <li>
                        <p>Kommentar: blablabla</p>
                    </li>
                    <li>
                        <p> Rapport: {this.renderReports()}</p>
                    </li>

                </ul>
            </div>
        );
    }
}

viewRapport.propTypes = {
    report: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('report', Meteor.userId());
    return {
        report: Reports.find({}, {title: 'torsk'}).fetch(),
        currentUser: Meteor.user(),
    };
}, viewRapport);