import React, {Component, PropTypes} from 'react';
import {ListGroupItem, ListGroup} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

import GetCategory from '../Common_components/getCategory.jsx';
import ShowImg from './ShowImg.jsx';

const T = i18n.createComponent();

//ShowReport komponenet - GJengir alle tekst innhold i rapport på skjermen
export default class ShowReport extends Component {



    render() {
        return (
            <row>
                <ListGroup>
                    <ListGroupItem>
                        <strong><T>common.showReport.species</T></strong> {this.props.report.text}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><T>common.index.category</T></strong> <GetCategory category={this.props.report.category}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><T>common.showReport.date</T></strong> {moment(this.props.report.taken).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><T>common.showReport.amount</T></strong> {this.props.report.amount}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><T>common.showReport.length</T></strong> {this.props.report.length} cm
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><T>common.showReport.depth</T></strong> {this.props.report.depth} meter
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><T>common.showReport.latitude</T></strong> {this.props.report.latitude}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><T>common.showReport.longitude</T></strong> {this.props.report.longitude}
                    </ListGroupItem>
                    {this.props.pageTextReport.reportFeedback === "" ?
                        null : <ListGroupItem>
                            <strong><T>common.showReport.feedback</T></strong> {this.props.report.reportFeedback}
                        </ListGroupItem>
                    }
                </ListGroup>
            </row>
        );
    }
}

ShowReport.propTypes = {
    report: PropTypes.object.isRequired,
    pageTextReport: PropTypes.object.isRequired
};