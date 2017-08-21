import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

import {Loading_feedback} from '../Common_components/Loading_feedback.jsx'
import GetCategory from '../Common_components/getCategory.jsx'

import {Meteor} from 'meteor/meteor';
const checkMarkStyle = {
    color: 'green',
    margin: 'auto',
    position: 'relative',
    scale: 4000,
};
const T = i18n.createComponent();

//Report komponent - Viser frem en rapport
export default class Report extends Component {

    //Åpner en ny side som viser en rapports innehold
    setShow(event) {
        event.preventDefault();

        let id = this.props.report._id;
        localStorage.setItem('report.id', id);
        localStorage.setItem('addMarker', false);
        localStorage.setItem('marker.id', this.props.report.markerId);
        FlowRouter.go('/seRapport');
    }

    reportTitel(){
        if(this.props.report.validSpecie && this.props.report.validSpecie !== ""){
            return '(' + this.props.report.validSpecie + ')' + this.props.report.text
        } else if (this.props.report.validSpecie === this.props.report.text){
            return this.props.report.text
        } else {
            return this.props.report.text
        }
    }

    render() {
        // Give reports a different className when they are checked off,
        // so that we can style them nicely in css
        //const reportClassName = this.props.report.checked ? 'checked' : '';
        if (Meteor.userId() === this.props.report.owner) {
            return (
                    <ListGroupItem header={this.reportTitel()} onClick={this.setShow.bind(this)}>
                        <strong><T>common.index.category</T> </strong>
                        <GetCategory category={this.props.report.category}/>
                        , {moment(this.props.report.taken).format("MMMM Do YYYY")}
                        {this.props.report.isValidated ?
                        <span className="glyphicon glyphicon-ok" style={checkMarkStyle}/>: null}
                    </ListGroupItem>

            );
        } else {
            return <Loading_feedback/>;
        }
    }
}
