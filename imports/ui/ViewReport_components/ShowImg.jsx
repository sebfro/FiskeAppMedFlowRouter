import React, {Component} from 'react';


//ShowImg komponent - gjengir et bilde på skjerm
export default class ShowImg extends Component {

    constructor(props){
        super(props);
        this.state = {
            enLarge: false
        }
    }

    setenLarge(){
        this.setState({
            enLarge: !this.state.enLarge
        })
    }

    render() {
            return (
                <img src={this.props.img} className="carouselItemImg"/>
            );
    }
}