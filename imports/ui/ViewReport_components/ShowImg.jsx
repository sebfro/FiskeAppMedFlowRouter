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
                <img width={900} height={500} src={this.props.img} className="carouselItemImg"/>
            );
    }
}