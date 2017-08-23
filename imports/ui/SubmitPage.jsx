import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonToolbar, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

import {
    hasNumbers,
    backToIndex,
    lessThanThirty,
    nrWithinLimit,
    isAlphanumeric,
    stringIsEmtpy
} from '../../lib/helpMethods.js';
import MyMap from './ViewReport_components/MyMap.jsx';
import Markers from './ViewReport_components/markers.jsx';
import NavBarBackBtn from './Common_components/navbarBackBtn.jsx';
import {remote, remoteApp} from '../../lib/reports.js';
import GetCategory from './Common_components/getCategory.jsx';
import ShowImg from './Common_components/ShowImg.jsx';

let takenImg = [];
let posLong;
let posLat;
let markerId;
const T = i18n.createComponent();

export function setLatLng(lat, lng) {
    posLat = lat;
    posLong = lng;
}

export function setMarkerId(id) {
    markerId = id;
}


//SubmitPage komponent - Gjengir side for å lage nye rapport og sden in.
class SubmitPage extends Component {

    //Setter state variabler
    constructor(props) {
        super(props);
        let category = localStorage.getItem('Category');
        if (category === undefined) {
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
            dateError: false,
            vesselError: false,
            toolError: false,
            useCurrPos: true,
            category: category,
            showNewReport: this.props.currentUser,
            images: takenImg,
            imgLimitReached: false,
            gpsOff: false,
        };

        this.removeImg = this.removeImg.bind(this);
    }

    //Oppdaterer state variabler
    inputError(length, amount, depth, titel, picture, marker, date, tool, vessel) {
        this.setState({
            lengthError: length,
            amountError: amount,
            depthError: depth,
            titelError: titel,
            pictureError: picture,
            markerError: marker,
            dateError: date,
            vesselError: vessel,
            toolError: tool
        })
    }

    changePos(e) {
        e.preventDefault();
        this.setState({
            useCurrPos: !this.state.useCurrPos
        })
    }

    //Henter bilde fra mobilens minne
    getPictureFromStorage(event) {
        event.preventDefault();
        if (takenImg.length < 3) {
            if (Meteor.isCordova) {
                let cameraOptions = {
                    height: 600,
                    width: 800,
                    quality: 100,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                };
                MeteorCamera.getPicture(cameraOptions, (error, data) => {
                    if (!error) {
                        takenImg.push(data);
                        this.setState({
                            images: takenImg
                        });
                    } else {
                        console.log(error.reason);
                    }
                });
            } else {
                alert("Can only get images from storage on Android or IOS");
            }
        } else {
            this.setLimitReached(true);
        }
    }

    setLimitReached(reached) {
        this.setState({
            imgLimitReached: reached,
        })
    }

    //Ta bilde med kamera
    takePicture(event) {
        event.preventDefault();
        console.log(takenImg);

        /*if (Meteor.isCordova) {

            navigator.camera.getPicture(camSucc, camErr, camOp);
        }*/

        if (takenImg.length < 3) {
            let cameraOptions = {
                //height: 600,
                //width: 800,
                quality: 100,
                correctOrientation: true,
            };
            MeteorCamera.getPicture(cameraOptions, (error, data) => {
                if (!error) {
                    //takenImg.push(data);
                    takenImg.push(data);
                    this.setState({
                        images: takenImg
                    });
                } else {
                    console.log(error.message);
                    console.log(error.reason);
                }
            });
        } else {
            this.setLimitReached(true);
        }
    }

    //Send inn alle variablene som skal være i rapport til report.js. Sjekker om det er noe galt med inputten og klaer da inputerror.
    //Sender de ellers videre.
    handleSubmit(event) {
        event.preventDefault();

        let dateError = false;

        //Find the text field via the react ref
        const titelText = ReactDOM.findDOMNode(this.refs.rapportTitel).value.trim();
        const lengthNr = ReactDOM.findDOMNode(this.refs.rapportLength).value.trim();
        const depthNr = ReactDOM.findDOMNode(this.refs.rapportDepth).value.trim();
        const amountNr = ReactDOM.findDOMNode(this.refs.rapportAmount).value.trim();
        const vesselText = ReactDOM.findDOMNode(this.refs.rapportVessel).value.trim();
        const toolText = ReactDOM.findDOMNode(this.refs.rapportTool).value.trim();

        console.log(vesselText);
        console.log(isAlphanumeric(vesselText));
        console.log(toolText);
        console.log(isAlphanumeric(toolText));


        let date;
        try {
            date = (ReactDOM.findDOMNode(this.refs.rapportDate).value.trim());
            date = new Date(date);
        } catch (e) {
            if (!this.state.useCurrPos) {
                dateError = true;
            } else {
                date = new Date();
            }

        }

        if (nrWithinLimit(lengthNr, 1000) || nrWithinLimit(amountNr, 100) || nrWithinLimit(depthNr, 1000) || !titelText ||
            hasNumbers(titelText) || lessThanThirty(titelText) || 0 === takenImg.length || !this.state.useCurrPos &&
            !localStorage.getItem('addedMarker') || dateError || isAlphanumeric(toolText) || isAlphanumeric(vesselText)) {

            this.inputError
            (nrWithinLimit(lengthNr, 1000), nrWithinLimit(amountNr, 100),
                nrWithinLimit(depthNr, 1000), !titelText || hasNumbers(titelText) || lessThanThirty(titelText),
                0 === takenImg.length, !this.state.useCurrPos && !localStorage.getItem('addedMarker'), dateError,
                isAlphanumeric(toolText), isAlphanumeric(vesselText));

        } else {

            if (Object.prototype.toString.call(date) === "[object date]") {
                if (isNaN(date.getTime())) {
                    console.log("invalid");
                } else {
                    console.log("valid");
                }
            } else {
                console.log("not date");
            }

            console.log(Meteor.user().emails[0].address);

            Meteor.call(`reports.insert`, titelText, Number(lengthNr),
                takenImg, posLat, posLong, Number(depthNr), Number(amountNr),
                this.state.useCurrPos, this.state.category, date, vesselText, toolText);


            ReactDOM.findDOMNode(this.refs.rapportTitel).value = '';
            ReactDOM.findDOMNode(this.refs.rapportLength).value = '';
            ReactDOM.findDOMNode(this.refs.rapportDepth).value = '';
            ReactDOM.findDOMNode(this.refs.rapportAmount).value = '';
            ReactDOM.findDOMNode(this.refs.rapportVessel).value = '';
            ReactDOM.findDOMNode(this.refs.rapportTool).value = '';

            takenImg = [];
            backToIndex(event);
        }
    }


    //Henter nåværende posisjonb
    getPos() {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onFailure);
    }

    //Mottar posisjons objekt og lagrer breddegrad og lengdegrad
    onSuccess(pos) {
        posLat = pos.coords.longitude;
        posLong = pos.coords.latitude;
    }

    onFailure() {
        this.setState({
            useCurrPos: false,
            gpsOff: true
        })
    }

    removeMarker() {
        Markers.remove(markerId);
    }

    onBackButtonDown(e) {
        e.preventDefault();
        e.stopPropagation();
        if (markerId) {
            this.removeMarker();
        }
        FlowRouter.go('/homepage');
    }

    removeImg(index) {
        if (0 < index < 4) {
            takenImg.splice(index, 1);
            this.setState({
                images: takenImg
            });
        }
        if (index < 3) {
            this.setLimitReached(false);
        }
    }


    componentWillMount() {
        this.getPos();
    }

    confirmSubmit(e) {
        if (Meteor.isCordova) {
            navigator.notification.confirm(
                i18n.__('common.popups.wantToSend'),
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        this.handleSubmit(e);
                    }
                },
                'Bekreft',
                [i18n.__('common.popups.send'), i18n.__('common.popups.cancel')]
            )
        } else {
            let r = confirm("Denne er kun for testing i nettleser. Trykk OK for å gå videre!");
            if (r === true) {
                this.handleSubmit(e);
            }
        }
    }

    render() {
        document.addEventListener("backbutton", this.onBackButtonDown, false);
        return (


            <div className="pageContainer">
                <header>
                    <NavBarBackBtn/>
                    <br/><br/>
                    <h2>
                        <GetCategory category={localStorage.getItem('Category')}/>
                        <T>common.submitPage.reporting</T>
                    </h2>
                </header>
                <form className="new-report">
                    <ul className="submitPageUls">
                        <li className="submitPageLis">
                            <p className="errorText" hidden={!this.state.titelError}>
                                <T>common.submitPageError.errorSpecie</T>
                            </p>
                            <input
                                type="text"
                                ref="rapportTitel"
                                placeholder={i18n.__('common.submitPage.enterSpecies')}
                            />
                        </li>
                        <li className="submitPageLis">
                            <p className="errorText" hidden={!this.state.lengthError}>
                                <T>common.submitPageError.errorLength</T>
                            </p>
                            <input
                                type="number"
                                ref="rapportLength"
                                placeholder={i18n.__('common.submitPage.enterLength')}
                            />
                        </li>
                        <li className="submitPageLis">
                            <p className="errorText" hidden={!this.state.depthError}>
                                <T>common.submitPageError.errorDepth</T>
                            </p>
                            <input
                                type="number"
                                ref="rapportDepth"
                                placeholder={i18n.__('common.submitPage.enterDepth')}
                            />
                        </li>
                        <li className="submitPageLis">
                            <p className="errorText" hidden={!this.state.amountError}>
                                <T>common.submitPageError.errorAmount</T>
                            </p>
                            <input
                                type="number"
                                ref="rapportAmount"
                                placeholder={i18n.__('common.submitPage.enterAmount')}
                            />
                        </li>
                        <div className="DeNyInputene">
                            <li className="submitPageLis">
                                <p className="errorText" hidden={!this.state.toolError}>
                                    <T>common.submitPageError.errorTool</T>
                                </p>
                                <input
                                    type="text"
                                    ref="rapportTool"
                                    placeholder={i18n.__('common.submitPage.tool')}
                                />
                            </li>
                            <li className="submitPageLis">
                                <p className="errorText" hidden={!this.state.vesselError}>
                                    <T>common.submitPageError.errorVessel</T>
                                </p>
                                <input
                                    type="text"
                                    ref="rapportVessel"
                                    placeholder={i18n.__('common.submitPage.vessel')}
                                />
                            </li>
                        </div>
                        {this.state.gpsOff ? null :
                            <li className="submitPageLis">
                                <Button bsStyle="primary" onClick={this.changePos.bind(this)}>
                                    <T>common.submitPage.didYouTakeImgHereBtn</T>
                                </Button>
                            </li>
                        }
                        {this.state.useCurrPos ?
                            ''
                            :
                            <li className="submitPageLis">
                                <p className="errorText" hidden={!this.state.markerError}>
                                    <T>common.submitPageError.errorPos</T>
                                </p>
                                <MyMap report={null}/>
                                <br/>
                                <p className="errorText" hidden={!this.state.dateError}>
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


                        <li className="submitPageLis">
                            <p className="errorText" hidden={!this.state.pictureError}>
                                <T>common.submitPageError.errorPicture</T>
                            </p>
                            <p className="errorText" hidden={!this.state.imgLimitReached}>
                                <T>common.submitPageError.imgLimitErr</T>
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
                        <ShowImg photo={this.state.images} removeImg={this.removeImg}/>
                        <li className="submitPageLis">
                            <Button bsStyle="primary" onClick={this.confirmSubmit.bind(this)}>
                                <T>common.submitPage.sendBtn</T>
                            </Button>
                        </li>
                    </ul>
                </form>

                <br/><br/>


            </div>
        )
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, SubmitPage);