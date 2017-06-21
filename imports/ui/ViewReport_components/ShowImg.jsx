import React, {Component, PropTypes} from 'react';
import { CarouselItem } from 'react-bootstrap';

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
        console.log("her er den");
        console.log(this.props.img);
        if(!this.state.enLarge) {
            return (
                <CarouselItem>
                    <img className="smallImg" src={this.props.img} height={80} width={80} onClick={this.setenLarge.bind(this)}/>
                </CarouselItem>
                    );
        } else {
            return (
                <CarouselItem>
                    <img className="bigImg" src={this.props.img} onClick={this.setenLarge.bind(this)}/>
                </CarouselItem>

            );
        }
    }
}

ShowImg.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    img: PropTypes.object.isRequired,
};