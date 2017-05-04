import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';

import {Reports} from '../api/reports.js';

import Report from './Report.jsx';


class viewRapport extends Component {
    renderReport(){
        let report = Reports.findOne();
        console.log(report);
        console.debug(report);
        console.debug("hei");
        if(report){
            console.log(report);
        }
    }

    backToIndex(event){
        FlowRouter.go("/");
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Rapport</h1>

                        <button className="nyRapportBtn" onClick={this.backToIndex.bind(this)}>
                            Tilbake
                        </button>
                </header>
                <ul>
                    <li>
                        <h3>Tittel</h3>
                    </li>
                    <li>
                        <p>Lengde: 30 cm</p>
                    </li>
                    <li>
                        <p>Kommentar: blablabla</p>
                    </li>
                    <li>
                        <p>{this.renderReport}</p>
                    </li>

                </ul>
            </div>
        );
    }
}

viewRapport.propTypes = {
    report: PropTypes.object.isRequired,
};

export default createContainer(() => {
    return {
        report: Reports.findOne( {title: "torsk"}),
    };
}, viewRapport);