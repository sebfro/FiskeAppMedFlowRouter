import React, {Component} from 'react';
import {Meteor, MeteorCamera} from 'meteor/meteor';

export default class TakePhoto extends Component{

    takePicture(event){
        console.log("hei");
        event.preventDefault();
        let cameraOptions = {
            height: 600,
            width: 800,
            quality: 100
        };
        console.log("hei");
        MeteorCamera.getPicture(cameraOptions, function (error, data){
            if(!error){
                ReactDOM.findDOMNode(this.refs.bilde).src = data;
            }
        });
    }

    render(){
        return(
               <li>
                   <img ref="bilde" src="">
                   </img>
               <button onClick={this.takePicture.bind(this)}>
                   Legg til bilde
               </button>
               </li>
        );
    }
}