import React, {Component, PropTypes} from 'react';
import {ListGroupItem, ListGroup} from 'react-bootstrap';

import ShowImg from './ShowImg.jsx';

//ShowReport komponenet - GJengir alle tekst innhold i rapport på skjermen
export default class ShowReport extends Component {

    //Kaller ShowImg komponent for hvert bilde i rapporten og gjengir det på skjerm
    renderImages() {
        console.log("RenderImages");
        let imgArray = [];
        for (let i = 0; i < this.props.report.photo.length; i++) {
            imgArray.push(
                <ShowImg key={i} img={this.props.report.photo[i]}/>
            )
        }
    }

    render() {
        return (
            <row>
                <ListGroup>
                    <ListGroupItem>
                        <strong> {this.props.pageTextReport.specie}: </strong> {this.props.report.text}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>{this.props.pageTextReport.category}: </strong> {this.props.report.category}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>{this.props.pageTextReport.date}: </strong> {moment(this.props.report.taken).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>{this.props.pageTextReport.amount}: </strong> {this.props.report.amount}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>{this.props.pageTextReport.length}: </strong> {this.props.report.length} cm
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>{this.props.pageTextReport.depth}: </strong> {this.props.report.depth} meter
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>{this.props.pageTextReport.latitude}: </strong> {this.props.report.latitude}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>{this.props.pageTextReport.longitude}: </strong> {this.props.report.longitude}
                    </ListGroupItem>
                </ListGroup>
            </row>
        );
    }
}

ShowReport.propTypes = {
    report: PropTypes.object.isRequired,
    pageTextReport: PropTypes.object.isRequired
};