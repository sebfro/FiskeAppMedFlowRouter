import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';


import {Reports} from '../api/reports';

let takeImg = [];

class SubmitPage extends Component {

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
                    document.getElementById("bilde").innerHTML = data;
                    console.log(document.getElementById("test").innerHTML);
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
                document.getElementById("bilde").innerHTML = data;
                console.log(document.getElementById("test").innerHTML);
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


        if (titelText != "" && kommentarText != "" && lengdeNr != "") {

            Meteor.call(`reports.insert`, titelText, kommentarText, Number(lengdeNr),
                takeImg, Geolocation.currentLocation());

            takeImg
            //Clear form

            ReactDOM.findDOMNode(this.refs.rapportTitel).value = '';
            ReactDOM.findDOMNode(this.refs.rapportKommentar).value = '';
            ReactDOM.findDOMNode(this.refs.rapportLengde).value = '';

            takeImg = [];
            this.backToIndex();

        }
    }

    backToIndex() {
        FlowRouter.go("/");
    }

    render() {
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
                            <img src="" id="bilde"/>
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

SubmitPage.propTypes = {
    reports: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        reports: Reports.find({}).fetch(),
    };
}, SubmitPage);