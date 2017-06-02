import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonToolbar} from 'react-bootstrap';

import { hasNumbers, backToIndex } from '../../lib/helpMethods.js';

let takeImg = [];
let posLong;
let posLat;

//SubmitPage komponent - Gjengir side for å lage nye rapport og sden in.
export default class SubmitPage extends Component {

    //Setter state variabler
    constructor(props){
        super(props);
        this.state = {
            lengthError: false,
            amountError: false,
            depthError: false,
            titelError: false,
            substrartError: false
        };
    }
    //Oppdaterer state variabler<
    inputError(length, amount, depth, titel, substrart){
        this.setState({
            lengthError: length,
            amountError: amount,
            depthError: depth,
            titelError: titel,
            substrartError: substrart
        })
    }
    //Henter bilde fra mobilens minne
    getPictureFromStorage(event) {
        event.preventDefault();
        if (Meteor.isCordova) {
            let cameraOptions = {
                height: 600,
                width: 800,
                quality: 100,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };
            MeteorCamera.getPicture(cameraOptions, function (error, data) {
                if (!error) {
                    takeImg.push(data);
                } else {
                    console.log(error.reason);
                }
            });
        } else {
            alert("Can only get images from storage on Android or IOS");
        }
    }

    //Ta bilde med kamera
    takePicture(event) {
        event.preventDefault();
        let cameraOptions = {
            height: 600,
            width: 800,
            quality: 100
        };
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
            if (!error) {
                console.log(data);
                takeImg.push(data);
            } else {
                console.log(error.reason);
            }
        });
    }

    //Send inn alle variablene som skal være i rapport til report.js. Sjekker om det er noe galt med inputten og klaer da inputerror.
    //Sender de ellers videre.
    handleSubmit(event) {

        event.preventDefault();


        //Find the text field via the react ref
        const titelText = ReactDOM.findDOMNode(this.refs.rapportTitel).value.trim();
        const lengthNr = ReactDOM.findDOMNode(this.refs.rapportLength).value.trim();
        const depthNr = ReactDOM.findDOMNode(this.refs.rapportDepth).value.trim();
        const amountNr = ReactDOM.findDOMNode(this.refs.rapportAmount).value.trim();
        //const substrartText = ReactDOM.findDOMNode(this.refs.rapportSubstrart).value.trim();


        if (lengthNr < 0 || lengthNr > 1000 || !lengthNr || amountNr < 0 || amountNr > 100 || !amountNr ||
            depthNr < 0 || depthNr > 1000 || !depthNr || !titelText || hasNumbers(titelText) /*|| !substrartText
        || hasNumbers(substrartText)*/) {

            this.inputError(lengthNr < 0 || lengthNr > 1000 || !lengthNr, amountNr < 0 || amountNr > 100 || !amountNr,
                depthNr < 0 || depthNr > 1000 || !depthNr, !titelText || hasNumbers(titelText)/*, !substrartText ||
            hasNumbers(substrartText)*/);


        } else {
            Meteor.call(`reports.insert`, titelText, /*substrartText,*/ Number(lengthNr),
                takeImg, posLat, posLong, Number(depthNr), Number(amountNr) );


            ReactDOM.findDOMNode(this.refs.rapportTitel).value = '';
            ReactDOM.findDOMNode(this.refs.rapportLength).value = '';
            ReactDOM.findDOMNode(this.refs.rapportDepth).value = '';
            ReactDOM.findDOMNode(this.refs.rapportAmount).value = '';
            //ReactDOM.findDOMNode(this.refs.rapportSubstrart).value = '';

            takeImg = [];
            backToIndex(event);
        }
    }

    //Henter nåværende posisjonb
    getPos(){
        navigator.geolocation.getCurrentPosition(this.onSuccess);
    }
    //Mottar posisjons objekt og lagrer breddegrad og lengdegrad
    onSuccess(pos){
        posLat = pos.coords.longitude;
        posLong = pos.coords.latitude;
    }


    render() {
        this.getPos();
        return (


            <div className="container">
                <header>
                    <h1>Ny rapport</h1>

                    <Button className="backBtn" bsStyle="primary" onClick={backToIndex.bind(this)}>
                        Tilbake
                    </Button>
                </header>
                <form className="new-report">
                    <ul>
                        <li>
                            <p className="errorText" hidden={!this.state.titelError}>
                                Art kan ikke inneholde tall eller være blank
                            </p>
                            <input
                                type="text"
                                ref="rapportTitel"
                                placeholder="Skriv inn art til rapporten"
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.lengthError}>
                                Lengde må være mellom 1 og 999
                            </p>
                            <input
                                type="number"
                                ref="rapportLength"
                                placeholder="Skriv inn lengde"
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.depthError}>
                                Dybde må være mellom 0 og 999
                            </p>
                            <input
                                type="number"
                                ref="rapportDepth"
                                placeholder="Skriv inn dybde"
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.amountError}>
                                Antall må være mellom 0 og 99
                            </p>
                            <input
                                type="number"
                                ref="rapportAmount"
                                placeholder="Skriv inn antall"
                            />
                        </li>

                        <li>
                            <ButtonToolbar>
                                <Button bsStyle="primary" onClick={this.takePicture.bind(this)}>
                                    Ta bilde
                                </Button>
                                <Button bsStyle="primary" onClick={this.getPictureFromStorage.bind(this)}>
                                    Hent bilde
                                </Button>
                            </ButtonToolbar>
                        </li>
                        <li>
                            <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>
                                Send
                            </Button>
                        </li>
                    </ul>
                </form>


            </div>
        )
    }
}