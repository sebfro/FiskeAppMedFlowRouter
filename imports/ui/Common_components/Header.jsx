import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Jumbotron} from 'react-bootstrap';

const style = {
    backgroundColor: '#5248f4',
    color: '#ffffff',
};
export default class Header extends Component {

    render(){
        return(
            <Jumbotron style={style}>
                <h1><strong>Reports</strong></h1>
            </Jumbotron>
        )
    }
}