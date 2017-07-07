import React, {Component, PropTypes} from 'react';
import { Button, ButtonGroup, NavItem, ListGroupItem } from 'react-bootstrap';


import {Meteor} from 'meteor/meteor';


//Report komponent - Viser frem en rapport
export default class Report extends Component {

    //Sletter en rapport
    deleteReport() {
        Meteor.call('reports.remove', this.props.report._id);
    }

    //Åpner en ny side som viser en rapports innehold
    setShow(event) {
        event.preventDefault();

        let id = this.props.report._id;
        Session.set('report.id', id);
        Session.set('addMarker', false);
        Session.set('marker.id', this.props.report.markerId);
        FlowRouter.go('/seRapport');
    }

    renderCategory(){
        if(this.props.report.category === "Koral"){
            return this.props.pageTextReport.coral;
        } else if(this.props.report.category === "Fiske art"){
            return this.props.pageTextReport.fish;
        } else {
            return this.props.pageTextReport.unknown;
        }
    }

    render() {
        // Give reports a different className when they are checked off,
        // so that we can style them nicely in css
        //const reportClassName = this.props.report.checked ? 'checked' : '';
        if (Meteor.userId() === this.props.report.owner) {
            return (
                    <ListGroupItem header={this.props.report.text} onClick={this.setShow.bind(this)}>
                        <strong>{this.props.pageTextReport.category}: </strong>
                        {this.renderCategory()}
                        , {moment(this.props.report.taken).format("MMMM Do YYYY")}
                    </ListGroupItem>

            );
        } else {
            return null;
        }
    }
}

Report.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use propTypes to indicate it is required
    report: PropTypes.object.isRequired,
    pageTextReport: PropTypes.object.isRequired
};