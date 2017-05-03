import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Reports} from '../api/reports.js';

import Report from './Report.jsx';

const buttonInstance = (
    <button>default</button>
);

class SubmitPage extends Component {
    handleSubmit(event) {

        event.preventDefault();

        //Find the text field via the react ref
        const titelText = ReactDOM.findDOMNode(this.refs.rapportTitel).value.trim();
        const kommentarText = ReactDOM.findDOMNode(this.refs.rapportKommentar).value.trim();
        const lengdeNr = ReactDOM.findDOMNode(this.refs.rapportLengde).value.trim();

        console.log("Her er inputen: " + kommentarText);
        console.log("Her er inputen: " + titelText);
        console.log("Her er inputen: " + lengdeNr);

        Meteor.call(`reports.insert`, ( titelText, kommentarText, lengdeNr) );


        //Clear form
        ReactDOM.findDOMNode(this.refs.rapportTitel).value = '';
        ReactDOM.findDOMNode(this.refs.rapportKommentar).value = '';
        ReactDOM.findDOMNode(this.refs.rapportLengde).value = '';

    }


    render() {
        return (
            <div className="container">
                <head>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                </head>
                <header>
                    <h1>Ny rapport</h1>
                </header>
                <form className="new-report">
                    <ul>
                        <li>

                            <input
                                type="text"
                                ref="rapportTitel"
                                placeholder="Skriv inn titel til rapporten"
                            />
                        </li>
                        <li>
                            <input
                                type="number"
                                ref="rapportLengde"
                                placeholder="Skriv inn lengde"
                            />
                        </li>
                        <li>

                            <input
                                type="text"
                                ref="rapportKommentar"
                                placeholder="Skriv inn kommentar til rapporten"
                            />
                        </li>
                        <li>
                                <button onClick={this.handleSubmit.bind(this)}>
                                    Send
                                </button>
                        </li>
                    </ul>
                </form>
            </div>
        )
    }
}

SubmitPage.propTypes = {
    reports: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        reports: Reports.find({}).fetch(),
    };
}, SubmitPage);