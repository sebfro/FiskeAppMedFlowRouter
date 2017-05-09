import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { Template } from 'meteor/templating';

import {Reports} from '../api/reports';
import TakePhoto from './TakePhoto.jsx';


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
        console.log("Her er bruker: " + Meteor.user);


        if (titelText != "" && kommentarText != "" && lengdeNr != "") {

                Meteor.call(`reports.insert`, titelText, kommentarText, Number(lengdeNr));


            //Clear form

            ReactDOM.findDOMNode(this.refs.rapportTitel).value = '';
            ReactDOM.findDOMNode(this.refs.rapportKommentar).value = '';
            ReactDOM.findDOMNode(this.refs.rapportLengde).value = '';

            this.backToIndex();

        }
    }

    backToIndex(){
        FlowRouter.go("/");
    }

    takePicture(event){
        event.preventDefault();
        let cameraOptions = {
            height: Number(600),
            width: Number(800),
            quality: 100
        };
        MeteorCamera.getPicture(cameraOptions, function(error, data){
            if (!error){
                ReactDOM.findDOMNode(this.refs.photo).src = data;
            } else {
                console.log(error.reason);
            }
        });
    }




    render() {
        return (


            <div className="container">
                <header>
                    <h1>Ny rapport</h1>

                        <button className="nyRapportBtn" onClick={this.backToIndex.bind(this)}>
                            Tilbake
                        </button>
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
                           <TakePhoto/>

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