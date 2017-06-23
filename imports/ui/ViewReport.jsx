import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';

import {Reports} from '../api/reports';
import ShowImg from './ViewReport_components/ShowImg.jsx';
import ShowReport from './ViewReport_components/ShowReport.jsx';
import GoogleMap from './ViewReport_components/MyMap.jsx';
import MyMap from "./ViewReport_components/MyMap";
import { Carousel } from 'react-bootstrap';


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

    onBackButtonDown(e){
        e.preventDefault();
        e.stopPropagation();

        FlowRouter.go('/');
    }

    render() {
        Session.set('addMarker', false);

        let report = Reports.findOne({_id: Session.get('report.id')});
        if (report === undefined) {
            FlowRouter.go('/');
        }
        document.addEventListener("backbutton", this.onBackButtonDown, false);
        return (
            <div className="container">
                <header>
                    <h1>Rapport</h1>

                    <Button className="nyRapportBtn" bsStyle="primary" onClick={this.backToIndex.bind(this)}>
                        Tilbake
                    </Button>
                </header>
                    <li>
                        {this.renderImg(report)}
                    </li>
                    <ShowReport report={report}/>
                <MyMap report={report}/>
                <br/><br/>
            </div>

        );

    }
}
