import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

import {Reports} from '../api/reports';
import ShowImg from './Index_components/ShowImg.jsx';

class ViewReport extends Component {

    renderImg(report) {
        return report.photo.map((img) => (
            <ShowImg key={img._id} img={img}/>
        ));
    }

    renderReport() {
        return Reports.findOne({_id: Session.get('report.id')});
    }

    backToIndex() {
        FlowRouter.go("/");
    }

    render() {
        console.log('Over here');
        console.log(Session.get('report.id'));


        let report = Reports.findOne({_id: Session.get('report.id')});
        console.log(report);
        if(report === undefined){
            FlowRouter.go('/');
        }

        return (
            <div className="container">
                <header>
                    <h1>Ny rapport</h1>

                    <Button className="nyRapportBtn" bsStyle="primary" onClick={this.backToIndex.bind(this)}>
                        Tilbake
                    </Button>
                </header>
                <ul>
                    <li>
                        {report.titel}
                    </li>
                    <li>
                        {report.lengde}
                    </li>
                    <li>
                        {report.kommentar}
                    </li>
                    <li>
                        {this.renderImg(report)}
                    </li>
                    <li>
                        {report.location}
                    </li>
                </ul>
            </div>
        );

    }
}

ViewReport.propTypes = {
    reports: PropTypes.array.isRequired,
};

export default createContainer(() => {
    console.log('in container');
    Meteor.subscribe('reports', Meteor.userId());
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
    }
}, ViewReport);