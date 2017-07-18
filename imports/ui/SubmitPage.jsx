import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonToolbar, Radio, Checkbox, FormGroup, FormControl, ControlLabel, InputGroup, Collapse} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

import { hasNumbers, backToIndex, dataURItoBlob } from '../../lib/helpMethods.js';
import MyMap from './ViewReport_components/MyMap.jsx';
import Markers from './ViewReport_components/markers.jsx';
import NavBarBackBtn from './Common_components/navbarBackBtn.jsx';
import {remote} from '../../lib/reports.js';
import GetCategory from './Common_components/getCategory.jsx';

let takeImg = [];
let posLong;
let posLat;
let markerId;
const T = i18n.createComponent();

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
        let category = localStorage.getItem('Category');
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
        };
    }

    //Oppdaterer state variabler
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
            date = new Date(date);
            console.log(date);
        } catch(e){}
        if      (lengthNr < 0 || lengthNr > 1000 /*|| !lengthNr*/ || amountNr < 0 || amountNr > 100 || /*!amountNr ||*/
                depthNr < 0 || depthNr > 1000 || /*!depthNr ||*/ !titelText || hasNumbers(titelText) || titelText.length > 30
                || 0 === takeImg.length || !this.state.useCurrPos && !localStorage.getItem('addedMarker')
            /*|| !substrartText || hasNumbers(substrartText)*/) {

            this.inputError
                (lengthNr < 0 || lengthNr > 1000 /*|| !lengthNr*/, amountNr < 0 || amountNr > 100 /*|| !amountNr*/,
                depthNr < 0 || depthNr > 1000 /*|| !depthNr*/, !titelText || hasNumbers(titelText) || titelText.length > 30,
                0 === takeImg.length, !this.state.useCurrPos && !localStorage.getItem('addedMarker')
                /*, !substrartText || hasNumbers(substrartText)*/);

        } else {

            if(Object.prototype.toString.call(date) === "[object date]"){
                if(isNaN(date.getTime())){
                    console.log("invalid");
                } else {
                    console.log("valid");
                }
            } else {
                console.log("not date");
            }

            console.log(Meteor.user().emails[0].address);

            remote.call(`reports.insert`, titelText, Number(lengthNr),
                takeImg, posLat, posLong, Number(depthNr), Number(amountNr),
                this.state.useCurrPos, this.state.category, date, Meteor.user().emails[0].address, Meteor.userId());

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
        FlowRouter.go('/homepage');
    }

    goBackToIndex(e){
        if(markerId){
            this.removeMarker()
        }
        backToIndex(e);
    }


    componentWillMount(){
        this.getPos();
    }

    render() {
        document.addEventListener("backbutton", this.onBackButtonDown, false);
        return (


            <div className="pageContainer">
                <header>
                    <NavBarBackBtn/>
                    <br/><br/>
                    <h2>
                        <T>common.submitPage.new</T>
                        <GetCategory category={localStorage.getItem('Category')}/>
                        <T>common.submitPage.report</T>
                    </h2>
                </header>
                <form className="new-report">
                    <ul>
                        <li>
                            <p className="errorText" hidden={!this.state.titelError}>
                                <T>common.submitPageError.errorSpecie</T>
                            </p>
                            <input
                                type="text"
                                ref="rapportTitel"
                                placeholder={i18n.__('common.submitPage.enterSpecies')}
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.lengthError}>
                                <T>common.submitPageError.errorLength</T>
                            </p>
                            <input
                                type="number"
                                ref="rapportLength"
                                placeholder={i18n.__('common.submitPage.enterLength')}
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.depthError}>
                                <T>common.submitPageError.errorDepth</T>
                            </p>
                            <input
                                type="number"
                                ref="rapportDepth"
                                placeholder={i18n.__('common.submitPage.enterDepth')}
                            />
                        </li>
                        <li>
                            <p className="errorText" hidden={!this.state.amountError}>
                                <T>common.submitPageError.errorAmount</T>
                            </p>
                            <input
                                type="number"
                                ref="rapportAmount"
                                placeholder={i18n.__('common.submitPage.enterAmount')}
                            />
                        </li>

                        <li>
                            <Button bsStyle="primary" onClick={this.changePos.bind(this)}>
                                <T>common.submitPage.didYouTakeImgHereBtn</T>
                            </Button>
                        </li>
                        {this.state.useCurrPos ?
                            ''
                            :
                            <li>
                                <p className="errorText" hidden={!this.state.markerError}>
                                    <T>common.submitPageError.errorPos</T>
                                </p>
                                <MyMap report={null}/>
                                <br/>
                                <p className="errorText" hidden={!this.state.titelError}>
                                    <T>common.submitPageError.errorDate</T>
                                </p>
                                <FormGroup>
                                    <ControlLabel>{i18n.__('common.submitPage.date')}</ControlLabel>
                                    <FormControl
                                        type="date"
                                        ref="rapportDate"
                                    />
                                </FormGroup>
                                <br/>
                                <FormGroup>
                                    <ControlLabel>{i18n.__('common.submitPage.description')}</ControlLabel>
                                    <FormControl
                                        id="feedback"
                                        componentClass="textarea"
                                        placeholder={i18n.__('common.submitPage.descriptionPlaceholder')}
                                    />
                                </FormGroup>
                            </li>
                        }



                        <li>
                            <p className="errorText" hidden={!this.state.pictureError}>
                                <T>common.submitPageError.errorPicture</T>
                            </p>
                            <ButtonToolbar>
                                <Button bsStyle="primary" onClick={this.takePicture.bind(this)}>
                                    <T>common.submitPage.takeImgBtn</T>
                                </Button>
                                <Button bsStyle="primary" onClick={this.getPictureFromStorage.bind(this)}>
                                    <T>common.submitPage.getImgBtn</T>
                                </Button>
                            </ButtonToolbar>
                        </li>
                        <li>
                            <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>
                                <T>common.submitPage.sendBtn</T>
                            </Button>
                        </li>
                    </ul>
                </form>


            </div>
        )
    }
}