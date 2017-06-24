import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonToolbar, Radio, Checkbox, FormGroup, FormControl, ControlLabel, InputGroup, Collapse} from 'react-bootstrap';

import { hasNumbers, backToIndex, dataURItoBlob } from '../../lib/helpMethods.js';
import MyMap from './ViewReport_components/MyMap.jsx';
import Markers from './ViewReport_components/markers.jsx';

let takeImg = [];
let posLong;
let posLat;
let markerId;

export function setLatLng(lat, lng){
    posLat = lat;
    posLong = lng;
}

export function setMarkerId(id){
    markerId = id;
}

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
            substrartError: false,
            pictureError: false,
            markerError: false,
            useCurrPos: true,
            category: Session.get('Category'),
        };
    }

    //Oppdaterer state variabler<
    inputError(length, amount, depth, titel, picture, marker){
        this.setState({
            lengthError: length,
            amountError: amount,
            depthError: depth,
            titelError: titel,
            pictureError: picture,
            markerError: marker
        })
    }
    changePos(e){
        e.preventDefault();
        this.setState({
            useCurrPos: !this.state.useCurrPos
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
            quality: 100,
            correctOrientation: true,
        };
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
            if (!error) {
                //takeImg.push(data);
                takeImg.push(data);
            } else {
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
        let date;
        try{
            date = (ReactDOM.findDOMNode(this.refs.rapportDate).value.trim());
        } catch(e){}


        if (lengthNr < 0 || lengthNr > 1000 /*|| !lengthNr*/ || amountNr < 0 || amountNr > 100 || /*!amountNr ||*/
            depthNr < 0 || depthNr > 1000 || /*!depthNr ||*/ !titelText || hasNumbers(titelText) /*|| 0 === takeImg.length*/
            || !this.state.useCurrPos && !Session.get('addedMarker')
            /*|| !substrartText || hasNumbers(substrartText)*/) {

            this.inputError(lengthNr < 0 || lengthNr > 1000 /*|| !lengthNr*/, amountNr < 0 || amountNr > 100 /*|| !amountNr*/,
                depthNr < 0 || depthNr > 1000 /*|| !depthNr*/, !titelText || hasNumbers(titelText), 0 === takeImg.length,
                (!this.state.useCurrPos && !Session.get('addedMarker'))
                /*, !substrartText || hasNumbers(substrartText)*/);

        } else {
            Meteor.call(`reports.insert`, titelText, /*substrartText,*/ Number(lengthNr),
                takeImg, posLat, posLong, Number(depthNr), Number(amountNr), markerId,
                this.state.useCurrPos, this.state.category, date);

            ReactDOM.findDOMNode(this.refs.rapportTitel).value = '';
            ReactDOM.findDOMNode(this.refs.rapportLength).value = '';
            ReactDOM.findDOMNode(this.refs.rapportDepth).value = '';
            ReactDOM.findDOMNode(this.refs.rapportAmount).value = '';

            takeImg = [];
            backToIndex(event);
        }
    }


    //Henter nåværende posisjonb
    getPos(){
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onFailure);
    }
    //Mottar posisjons objekt og lagrer breddegrad og lengdegrad
    onSuccess(pos){
        posLat = pos.coords.longitude;
        posLong = pos.coords.latitude;
    }
    onFailure(){
        this.setState({
            useCurrPos: false
        })
    }

    removeMarker(){
        Markers.remove(markerId);
    }

    onBackButtonDown(e){
        e.preventDefault();
        e.stopPropagation();
        if(markerId){
            this.removeMarker();
        }
        FlowRouter.go('/');
    }

    goBackToIndex(e){
        if(markerId){
            this.removeMarker()
        }
        backToIndex(e);
    }

    render() {
        this.getPos();

        document.addEventListener("backbutton", this.onBackButtonDown, false);
        return (


            <div className="container">
                <header>
                    <Button className="backBtn" bsStyle="primary" onClick={this.goBackToIndex.bind(this)}>
                        Tilbake
                    </Button>
                    <h2>Ny {this.state.category.toLowerCase()} rapport</h2>
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
                                placeholder="Skriv inn hvilken art du tror det er"
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.lengthError}>
                                Lengde må være mellom 1 og 999
                            </p>
                            <input
                                type="number"
                                ref="rapportLength"
                                placeholder="Skriv inn lengde (cm)"
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.depthError}>
                                Dybde må være mellom 0 og 999
                            </p>
                            <input
                                type="number"
                                ref="rapportDepth"
                                placeholder="Skriv inn dybde (meter)"
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
                            <Button bsStyle="primary" onClick={this.changePos.bind(this)}>
                                Tok du bilde her?
                            </Button>
                        </li>
                        {this.state.useCurrPos ?
                            ''
                            :
                            <li>
                                <p className="errorText" hidden={!this.state.markerError}>
                                    Du må legge til en posisjon
                                </p>
                                <MyMap report={null}/>
                                <br/>
                                <p className="errorText" hidden={!this.state.titelError}>
                                    Dato må fylles inn
                                </p>
                                <FormGroup>
                                    <ControlLabel>Dato:</ControlLabel>
                                    <FormControl
                                        type="date"
                                        ref="rapportDate"
                                    />
                                </FormGroup>
                                <br/>
                                <FormGroup>
                                    <ControlLabel>Beskrivelse:</ControlLabel>
                                    <FormControl id="feedback" componentClass="textarea" placeholder="Forklar hvis du føler det er nødvendig.."/>
                                </FormGroup>
                            </li>
                        }



                        <li>
                            <p className="errorText" hidden={!this.state.pictureError}>
                                Ingen bilder lastet opp
                            </p>
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