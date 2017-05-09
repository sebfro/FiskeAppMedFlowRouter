import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SubmitPage from './SubmitPage.jsx';

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
                SubmitPage.setImg(data);
            } else {
                console.log(error.reason);
            }
        });
    }

    render(){
        return(
               <li>
               <button onClick={this.takePicture.bind(this)}>
                   Legg til bilde
               </button>
               </li>
        );
    }
}