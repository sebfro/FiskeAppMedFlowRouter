import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';



let takeImg = [];
let posLong;
let posLat;


export default class SubmitPage extends Component {

    getPictureFromStorage(event) {
        event.preventDefault();
        console.log("Getting picture");
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
        console.log("Taking photo");
        event.preventDefault();
        let cameraOptions = {
            height: 600,
            width: 800,
            quality: 100
        };
        console.log("hei");
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
            if (!error) {
                console.log("Pic right under");
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
        const kommentarText = ReactDOM.findDOMNode(this.refs.rapportKommentar).value.trim();
        const lengdeNr = ReactDOM.findDOMNode(this.refs.rapportLengde).value.trim();

        console.log("Her er inputen: " + kommentarText);
        console.log("Her er inputen: " + titelText);
        console.log("Her er inputen: " + lengdeNr);
        console.log("Her er bruker: " + Meteor.user);
        console.log("Her er posLong" + posLong);
        console.log("Her er posLat" + posLat);


        if (titelText != "" && kommentarText != "" && lengdeNr != "") {

            Meteor.call(`reports.insert`, titelText, kommentarText, Number(lengdeNr),
                takeImg, posLat, posLong );


            ReactDOM.findDOMNode(this.refs.rapportTitel).value = '';
            ReactDOM.findDOMNode(this.refs.rapportKommentar).value = '';
            ReactDOM.findDOMNode(this.refs.rapportLengde).value = '';

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
        console.log(pos.coords.longitude);
        console.log(pos.coords.latitude);
        posLat = pos.coords.longitude;
        posLong = pos.coords.latitude;
        console.log(posLat);
        console.log(posLong);
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