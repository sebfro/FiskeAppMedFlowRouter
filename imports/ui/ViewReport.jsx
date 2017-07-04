import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';

import {Reports} from '../../lib/reports';
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
        for (let i = 0; i < this.props.report[0].photo.length; i++) {
            imgArray.push(
                <CarouselItem>
                    <ShowImg key={i} img={this.props.report[0].photo[i]}/>
                </CarouselItem>
            )
        }

        return <Carousel>{imgArray}</Carousel>;

        /*
        return this.props.report[0].photo.map((photo) => (
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
        let report = Reports.findOne({_id: Session.get('report.id')});
        if (report === undefined) {
            FlowRouter.go('/homepage');
        }
        console.log("Dette er titelen til rapporten");
        console.log("Dette er titelen til rapporten");
        console.log("Dette er titelen til rapporten");
        console.log("Dette er titelen til rapporten");
        console.log(this.props.report[0].text);
        document.addEventListener("backbutton", this.onBackButtonDown, false);
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
                    <ShowReport report={this.props.report[0]} pageTextReport={this.state.pageTextReport}/>
                <MyMap report={this.props.report[0]}/>
                <br/><br/>
            </div>

        );

    }
}

ViewReport.propTypes = {
    report: PropTypes.array.isRequired,
};

export default createContainer(() => {
    let rId = Session.get('report.id');
    Meteor.subscribe('reports.findOne', rId);
    return {
        report: Reports.find({_id: rId}).fetch(),
    };
}, ViewReport);
