import React, {Component, PropTypes} from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import {Meteor} from 'meteor/meteor';

export default class ChooseReportType extends Component{

    newReportFisk(e){
        e.preventDefault();
        Session.set('Category', "fiskeArt");
        this.setSession();
        FlowRouter.go("/nyRapport");
    }

    newReportKoral(e){
        e.preventDefault();
        Session.set('Category', "koral");
        this.setSession();
        FlowRouter.go("/nyRapport");
    }

    newReportFremmed(e){
        e.preventDefault();
        Session.set('Category', "fremmedArt");
        this.setSession();
        FlowRouter.go("/nyRapport");
    }

    setSession(){
        console.log("Marker has been set");
        Session.set('addMarker', true);
    }

    render(){
        if(Meteor.userId()) {
            return (
                <div>
                    <ButtonGroup bsSize="large" bsStyle="primary">
                        <Button onClick={this.newReportFisk.bind(this)}>
                            Fiske Art
                        </Button>
                        <Button onClick={this.newReportKoral.bind(this)}>
                            Koral
                        </Button>
                        <Button onClick={this.newReportFremmed.bind(this)}>
                            Fremmed Art
                        </Button>
                    </ButtonGroup>
                </div>
            )
        } else {
            return null;
        }
    }
}