import React, {Component, PropTypes} from 'react';

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
        console.log(id);
        Session.set('report.id', id);
        FlowRouter.go('/seRapport');
    }


    render() {
        // Give reports a different className when they are checked off,
        // so that we can style them nicely in css
        const reportClassName = this.props.report.checked ? 'checked' : '';
        if (Meteor.userId() === this.props.report.owner) {
            return (

                <div>

                    <li onClick={this.setShow.bind(this)}>

                        <span className="text">{this.props.report.text} </span>


                    </li>
                </div>
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
};