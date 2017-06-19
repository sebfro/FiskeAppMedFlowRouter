import React, {Component, PropTypes} from 'react';

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
        if(!this.state.enLarge) {
            return (
                <img className="smallImg" src={this.props.img} height={160} width={90} onClick={this.setenLarge.bind(this)}/>
            );
        } else {
            return (
            <img className="smallImg" src={this.props.img} onClick={this.setenLarge.bind(this)}/>
            );
        }
    }
}

ShowImg.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    img: PropTypes.object.isRequired,
};