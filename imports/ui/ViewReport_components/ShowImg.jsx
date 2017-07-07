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
            return (
                <img src={this.props.img}/>
            );
    }
}

ShowImg.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    img: PropTypes.string.isRequired,
};