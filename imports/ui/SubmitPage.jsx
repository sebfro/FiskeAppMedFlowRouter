import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonToolbar} from 'react-bootstrap';

import { hasNumbers } from '../../lib/helpMethods.js';

let takeImg = [];
let posLong;
let posLat;


export default class SubmitPage extends Component {

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

    inputError(length, amount, depth, titel, substrart){
        this.setState({
            lengthError: length,
            amountError: amount,
            depthError: depth,
            titelError: titel,
            substrartError: substrart
        })
    }

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


    handleSubmit(event) {

        event.preventDefault();


        //Find the text field via the react ref
        const titelText = ReactDOM.findDOMNode(this.refs.rapportTitel).value.trim();
        const lengthNr = ReactDOM.findDOMNode(this.refs.rapportLength).value.trim();
        const depthNr = ReactDOM.findDOMNode(this.refs.rapportDepth).value.trim();
        const amountNr = ReactDOM.findDOMNode(this.refs.rapportAmount).value.trim();
        const substrartText = ReactDOM.findDOMNode(this.refs.rapportSubstrart).value.trim();


        if (lengthNr < 0 || lengthNr > 1000 || !lengthNr || amountNr < 0 || amountNr > 100 || !amountNr ||
            depthNr < 0 || depthNr > 1000 || !depthNr || !titelText || hasNumbers(titelText) || !substrartText
        || hasNumbers(substrartText)) {

            this.inputError(lengthNr < 0 || lengthNr > 1000 || !lengthNr, amountNr < 0 || amountNr > 100 || !amountNr,
                depthNr < 0 || depthNr > 1000 || !depthNr, !titelText || hasNumbers(titelText), !substrartText ||
            hasNumbers(substrartText));


        } else {
            Meteor.call(`reports.insert`, titelText, substrartText, Number(lengthNr),
                takeImg, posLat, posLong, Number(depthNr), Number(amountNr) );


            ReactDOM.findDOMNode(this.refs.rapportTitel).value = '';
            ReactDOM.findDOMNode(this.refs.rapportLength).value = '';
            ReactDOM.findDOMNode(this.refs.rapportDepth).value = '';
            ReactDOM.findDOMNode(this.refs.rapportAmount).value = '';
            ReactDOM.findDOMNode(this.refs.rapportSubstrart).value = '';

            takeImg = [];
            this.backToIndex(event);
        }
    }

    backToIndex(event) {
        event.preventDefault();
        console.log("test");
        FlowRouter.go("index", "hei");
    }
    getPos(){
        navigator.geolocation.getCurrentPosition(this.onSuccess);
    }

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

                    <Button className="backBtn" bsStyle="primary" onClick={this.backToIndex.bind(this)}>
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
                                placeholder="Skriv inn titel til rapporten"
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.lengthError}>
                                Lengde må være mellom 0 og 99
                            </p>
                            <input
                                type="number"
                                ref="rapportLength"
                                placeholder="Skriv inn lengde"
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.depthError}>
                                Dybde må være mellom 0 og 99
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
                            <p className="errorText" hidden={!this.state.substrartError}>
                                Substrart kan ikke inneholde tall eller være blank
                            </p>
                            <input
                                type="text"
                                ref="rapportSubstrart"
                                placeholder="Skriv inn substrat"
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