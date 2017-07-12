import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, Panel, ListGroupItem, ButtonGroup} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

const style = {
    color: '#ffffff',
    textAlign: "center",
    backgroundImage: 'linear-gradient(to bottom,#337ab7 0,#2e6da4 100%)'
};
const T = i18n.createComponent();

export default class ShowMoreBtn extends Component {

    setShowMoreBtn(e) {
        e.preventDefault();
        Session.set('limit', Session.get('limit') + 10);
        console.log("showing more " + Session.get('limit'));
    }

    render(){
        return(
            <ListGroupItem style={style} onClick={this.setShowMoreBtn.bind(this)}>
                <T>common.showMoreBtn.showMore</T>
            </ListGroupItem>
        )
    }
}