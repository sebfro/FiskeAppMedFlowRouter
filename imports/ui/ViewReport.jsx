import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';

import {Reports} from '../api/reports';
import ShowImg from './ViewReport_components/ShowImg.jsx';
import ShowReport from './ViewReport_components/ShowReport.jsx';
import ShowPosition from './ViewReport_components/ShowPosistion'

export default class ViewReport extends Component {

    renderImg(report) {
        return report.photo.map((photo) => (
            <ShowImg key={photo._id} img={photo}/>
        ));
    }

    backToIndex() {
        FlowRouter.go("/");
    }

    render() {
        console.log('Over here');
        console.log(Session.get('report.id'));


        let report = Reports.findOne({_id: Session.get('report.id')});
        console.log(report);
        if (report === undefined) {
            FlowRouter.go('/');
        }

        return (
            <div className="container">
                <header>
                    <h1>Rapport</h1>

                    <Button className="nyRapportBtn" bsStyle="primary" onClick={this.backToIndex.bind(this)}>
                        Tilbake
                    </Button>
                </header>
                <div>
                    {this.renderImg(report)}
                </div>
                <ShowReport report={report}/>
            </div>

        );

    }
}
