import React, {Component} from 'react';

export default class TakePhoto extends Component{

    takePicture(event){
        event.preventDefault();
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