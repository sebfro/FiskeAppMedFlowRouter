import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';

import {Reports, remote} from '../../lib/reports';
import ShowImg from './ViewReport_components/ShowImg.jsx';
import ShowReport from './ViewReport_components/ShowReport.jsx';
import NavBarBackBtn from './Common_components/navbarBackBtn.jsx';
import GoogleMap from './ViewReport_components/MyMap.jsx';
import MyMap from "./ViewReport_components/MyMap";
import { Carousel, CarouselItem } from 'react-bootstrap';


//ViewReport komponent - Hovedkomponent for visning av en rapport
class ViewReport extends Component {
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


    renderImg() {
        let imgArray = [];
        for (let i = 0; i < this.props.report.photo.length; i++) {
            imgArray.push(
                <CarouselItem>
                    <ShowImg key={i} img={this.props.report.photo[i]}/>
                </CarouselItem>
            )
        }

        return <Carousel>{imgArray}</Carousel>;

        /*
        return this.props.report.photo.map((photo) => (
            <ShowImg key={photo._id} img={photo}/>
        ));
        */
    }

    backToIndex() {
        FlowRouter.go("/homepage");
    }

    onBackButtonDown(e){
        e.preventDefault();
        e.stopPropagation();

        FlowRouter.go('/homepage');
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
        Session.set('addMarker', false);
    }

    render() {
        document.addEventListener("backbutton", this.onBackButtonDown, false);
        if(this.props.report) {
            return (
                <div className="pageContainer">
                    <header>
                        <NavBarBackBtn/>
                        <br/><br/>
                        <h1>{this.state.pageText.report}</h1>
                    </header>
                    <li>
                        {this.renderImg()}
                    </li>
                    <ShowReport report={this.props.report} pageTextReport={this.state.pageTextReport}/>
                    <MyMap report={this.props.report}/>
                    <br/><br/>
                </div>

            );
        } else {
            return null;
        }

    }
}


export default createContainer(() => {
    let rId = Session.get('report.id');
    let fields = {
        text: 1, length: 1, photo: 1,
        user: 1, latitude: 1, longitude: 1,
        depth: 1, amount: 1, markerId: 1,
        taken: 1, reportFeedback: 1, category: 1
    };
    let reportSub = remote.subscribe('reports.findOne', rId, fields);
    let report;
    if(reportSub.ready()){
        report = Reports.findOne({_id: rId}, {fields: fields});
    }
    return {
        report: report,
    };
}, ViewReport);
