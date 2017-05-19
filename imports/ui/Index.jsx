import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';


import {Reports} from '../api/reports.js';

import Report from './Index_components/Report.jsx';
import AccountsUIWrapper from './AcountsUIWrapper.jsx';

//Index component - represents the whole app
class Index extends Component {



    newReport(event) {
        event.preventDefault();
        console.log("Ny rapport");
        console.debug("Ny rapport");
        FlowRouter.go("/nyRapport");
    }

    seeReport(event){
        event.preventDefault();
        FlowRouter.go("/seRapport");
    }


    renderReports() {
        console.log(this.props.currentUser);

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
                    { this.props.currentUser ?
                        <div>
                            <ButtonGroup className="nyRapportBtn">
                                <Button bsStyle="primary" onClick={this.seeReport.bind(this)}>
                                    Se rapport
                                </Button>
                                <Button bsStyle="primary" onClick={this.newReport.bind(this)}>
                                    Ny rapport
                                </Button>
                            </ButtonGroup>
                        </div>
                        : ''
                    }

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
    Meteor.subscribe('reports', Meteor.userId());
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);