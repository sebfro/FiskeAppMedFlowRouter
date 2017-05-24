import React, {Component, PropTypes} from 'react';


export default class ShowImg extends Component{

    render(){
        return(
                <img src={this.props.img} height={80} width={80} hspace="20" onClick={ () => this.setState({ isOpen: true })}/>
        );
    }
}

ShowImg.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    img: PropTypes.object.isRequired,
};