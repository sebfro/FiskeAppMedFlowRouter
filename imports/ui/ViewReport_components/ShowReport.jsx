import React, {Component, PropTypes} from 'react';
import {ListGroupItem, ListGroup} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

import GetCategory from '../Common_components/getCategory.jsx';

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
                    {this.props.report.validSpecie === "" ? null :
                        <ListGroupItem className="species">
                            <strong><T>common.showReport.validSpecies</T></strong> {this.props.report.validSpecie}
                        </ListGroupItem>
                    }
                    <ListGroupItem>
                        <strong><T>common.index.category</T></strong> <GetCategory category={this.props.report.category}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><T>common.showReport.date</T></strong> {moment(this.props.report.taken).format("dddd, MMMM Do YYYY")}
                    </ListGroupItem>
                    {this.props.report.isValidated ?
                        <ListGroupItem className="validationDate">
                            <strong><T>common.showReport.validationDate</T></strong> {moment(this.props.report.validationDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                        </ListGroupItem>
                        : null
                    }
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
                    {this.props.report.tool ?
                        <ListGroupItem>
                            <strong><T>common.showReport.tool</T></strong> {this.props.report.tool}
                        </ListGroupItem>
                        : null
                    }
                    {this.props.report.vessel ?
                        <ListGroupItem>
                            <strong><T>common.showReport.vessel</T></strong> {this.props.report.vessel}
                        </ListGroupItem>
                        : null
                    }
                    {this.props.report.reportFeedback === "" ?
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