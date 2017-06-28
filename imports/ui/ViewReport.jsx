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
    constructor(props){
        super(props);
        this.state = {
            pageText: {
                report: 'Report',
                backBtn: 'Back',
                language: 'English'
            },
            english: {
                report: 'Report',
                backBtn: 'Back',
                language: 'English'
            },
            norwegian: {
                report: 'Rapport',
                backBtn: 'Tilbake',
                language: 'Norsk'
            },
            pageTextReport: {
                specie: 'Specie',
                category: 'Category',
                amount: 'Amount',
                length: 'Length',
                depth: 'Depth',
                latitude: 'Latitude',
                longitude: 'Longitude',
                date: 'Date'
            },
            englishReport: {
                specie: 'Specie',
                category: 'Category',
                amount: 'Amount',
                length: 'Length',
                depth: 'Depth',
                latitude: 'Latitude',
                longitude: 'Longitude',
                date: 'Date'
            },
            norwegianReport: {
                specie: 'Art',
                category: 'kategori',
                amount: 'Antall',
                length: 'Lengde',
                depth: 'Dybde',
                latitude: 'Breddegrad',
                longitude: 'Lengdegrad',
                date: 'Dato'
            },
        }
    }


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

    setPageText(){
        if(Session.get('language') === "english") {
            this.setState({
                pageText: this.state.english,
                pageTextReport: this.state.englishReport,
            });
        } else {
            this.setState({
                pageText: this.state.norwegian,
                pageTextReport: this.state.norwegianReport,
            });
        }
    }

    componentWillMount(){
        this.setPageText();
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
                    <h1>{this.state.pageText.report}</h1>

                    <Button className="nyRapportBtn" bsStyle="primary" onClick={this.backToIndex.bind(this)}>
                        {this.state.pageText.backBtn}
                    </Button>
                </header>
                    <li>
                        {this.renderImg(report)}
                    </li>
                    <ShowReport report={report} pageTextReport={this.state.pageTextReport}/>
                <MyMap report={report}/>
                <br/><br/>
            </div>

        );

    }
}
