import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';

import {Reports} from '../api/reports';
import ShowImg from './ViewReport_components/ShowImg.jsx';
import ShowReport from './ViewReport_components/ShowReport.jsx';
import GoogleMap from './ViewReport_components/MyMap.jsx';
import MyMap from "./ViewReport_components/MyMap";


//ViewReport komponent - Hovedkomponent for visning av en rapport
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
        Session.set('addMarker', false);

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
                <ul>
                    <li>
                        {this.renderImg(report)}
                    </li>
                    <ShowReport report={report}/>
                </ul>
                <MyMap report={report}/>
            </div>

        );

    }
}
