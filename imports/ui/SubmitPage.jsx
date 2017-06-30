import React, { Component, PropTypes } from 'react';
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
        let category = Session.get('Category');
        if(category === undefined){
            category = '';
        }
        this.state = {
            lengthError: false,
            amountError: false,
            depthError: false,
            titelError: false,
            substrartError: false,
            pictureError: false,
            markerError: false,
            useCurrPos: true,
            category: category,
            showNewReport: this.props.currentUser,

            pageText: {
                placeholderSpecie: 'Enter what specie you believe it is',
                placeholderLength: 'Enter length (cm)',
                placeholderDepth: 'Enter depth (meter',
                placeholderAmount: 'Enter amount',
                placeholderDescription: 'Explain if you believe its necessary..',
                photoTakenHereBtn: 'Did you take the picture here?',
                takePicBtn: 'Take picture',
                getPicBtn: 'Get picture',
                backBtn: 'Back',
                date: 'Date',
                description: 'Description',
                errorSpecie: 'Specie cannot include numbers, be blank or longer than 30 characters',
                errorPicture: 'No picture uploaded',
                errorPos: 'You must add position',
                errorDate: 'Date must be entered',
                errorLength: 'Length must be between 1 and 999',
                errorDepth: 'Depth must be between 0 and 999',
                errorAmount: 'Amount must be between 0 and 99'
            },
            english: {
                placeholderSpecie: 'Enter what specie you believe it is',
                placeholderLength: 'Enter length (cm)',
                placeholderDepth: 'Enter depth (meter',
                placeholderAmount: 'Enter amount',
                placeholderDescription: 'Explain if you believe its necessary..',
                photoTakenHereBtn: 'Did you take the picture here?',
                takePicBtn: 'Take picture',
                getPicBtn: 'Get picture',
                backBtn: 'Back',
                date: 'Date',
                description: 'Description',
                errorSpecie: 'Specie cannot include numbers, be blank or longer than 30 characters',
                errorPicture: 'No picture uploaded',
                errorPos: 'You must add position',
                errorDate: 'Date must be entered',
                errorLength: 'Length must be between 1 and 999',
                errorDepth: 'Depth must be between 0 and 999',
                errorAmount: 'Amount must be between 0 and 99'

            },
            norwegian: {
                placeholderSpecie: 'Skriv inn hvilken art du tror det er',
                placeholderLength: 'Skriv inn lengde (cm)',
                placeholderDepth: 'Skriv inn dybde (meter',
                placeholderAmount: 'Skriv inn antall',
                placeholderDescription: 'Forklar hvis du føler det er nødvendig..',
                photoTakenHereBtn: 'Tok du bilde her?',
                takePicBtn: 'Ta bilde',
                getPicBtn: 'Hent bilde',
                backBtn: 'Tilbake',
                date: 'Dato',
                description: 'Beskrivelse',
                errorSpecie: 'Art kan ikke inneholde tall, være blank eller være lengre enn 30 bokstaver',
                errorPicture: 'Ingen bilder lastet opp',
                errorPos: 'En posisjon må legges til',
                errorDate: 'Dato må fylles inn',
                errorLength: 'Lengde må være mellpm 1 og 999',
                errorDepth: 'Dybde må være mellom 0 og 999',
                errorAmount: 'Antall må være mellom 0 og 99'
            }
        };
    }

    //Oppdaterer state variabler
    inputError(length, amount, depth, titel, picture, marker){
        console.log(length);
        console.log(amount);
        console.log(depth);
        console.log(titel);
        console.log(picture);
        console.log(marker);
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
        console.log("handleSubmit");
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
        console.log("handleSubmit");
        if      (lengthNr < 0 || lengthNr > 1000 /*|| !lengthNr*/ || amountNr < 0 || amountNr > 100 || /*!amountNr ||*/
                depthNr < 0 || depthNr > 1000 || /*!depthNr ||*/ !titelText || hasNumbers(titelText) || titelText.length > 30
                || 0 === takeImg.length || !this.state.useCurrPos && !Session.get('addedMarker')
            /*|| !substrartText || hasNumbers(substrartText)*/) {
            console.log("handleSubmit");

            this.inputError
                (lengthNr < 0 || lengthNr > 1000 /*|| !lengthNr*/, amountNr < 0 || amountNr > 100 /*|| !amountNr*/,
                depthNr < 0 || depthNr > 1000 /*|| !depthNr*/, !titelText || hasNumbers(titelText) || titelText.length > 30,
                0 === takeImg.length, !this.state.useCurrPos && !Session.get('addedMarker')
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

    setPageText(){
        if(Session.get('language') === 'english'){
            console.log("Teksten blir satt til engelsk");
            this.setState({
                pageText: this.state.english
            })
        } else {
            console.log("Teksten blir satt til norsk");
            this.setState({
                pageText: this.state.norwegian
            });
        }
    }

    componentWillMount(){
        this.setPageText();
        this.getPos();
    }

    showNewReport(){
        FlowRouter('/');
    }

    render() {
        document.addEventListener("backbutton", this.onBackButtonDown, false);
        return (


            <div className="pageContainer">
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
                                {this.state.pageText.errorSpecie}
                            </p>
                            <input
                                type="text"
                                ref="rapportTitel"
                                placeholder={this.state.pageText.placeholderSpecie}
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.lengthError}>
                                {this.state.pageText.errorLength}
                            </p>
                            <input
                                type="number"
                                ref="rapportLength"
                                placeholder={this.state.pageText.placeholderLength}
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.depthError}>
                                {this.state.pageText.errorDepth}
                            </p>
                            <input
                                type="number"
                                ref="rapportDepth"
                                placeholder={this.state.pageText.placeholderDepth}
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.amountError}>
                                {this.state.pageText.errorAmount}
                            </p>
                            <input
                                type="number"
                                ref="rapportAmount"
                                placeholder={this.state.pageText.placeholderAmount}
                            />
                        </li>

                        <li>
                            <Button bsStyle="primary" onClick={this.changePos.bind(this)}>
                                {this.state.pageText.photoTakenHereBtn}
                            </Button>
                        </li>
                        {this.state.useCurrPos ?
                            ''
                            :
                            <li>
                                <p className="errorText" hidden={!this.state.markerError}>
                                    {this.state.pageText.errorPos}
                                </p>
                                <MyMap report={null}/>
                                <br/>
                                <p className="errorText" hidden={!this.state.titelError}>
                                    {this.state.pageText.errorDate}
                                </p>
                                <FormGroup>
                                    <ControlLabel>{this.state.pageText.date}:</ControlLabel>
                                    <FormControl
                                        type="date"
                                        ref="rapportDate"
                                    />
                                </FormGroup>
                                <br/>
                                <FormGroup>
                                    <ControlLabel>{this.state.pageText.description}:</ControlLabel>
                                    <FormControl
                                        id="feedback"
                                        componentClass="textarea"
                                        placeholder={this.state.pageText.placeholderDescription}
                                    />
                                </FormGroup>
                            </li>
                        }



                        <li>
                            <p className="errorText" hidden={!this.state.pictureError}>
                                {this.state.pageText.errorPicture}
                            </p>
                            <ButtonToolbar>
                                <Button bsStyle="primary" onClick={this.takePicture.bind(this)}>
                                    {this.state.pageText.takePicBtn}
                                </Button>
                                <Button bsStyle="primary" onClick={this.getPictureFromStorage.bind(this)}>
                                    {this.state.pageText.getPicBtn}
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