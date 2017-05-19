import React, {Component, PropTypes} from 'react';


export default class ShowImg extends Component{

    render(){
        console.log(this.props.img);
        return(
                <img src={this.props.img} height={80} width={80} onClick={ () => this.setState({ isOpen: true })}/>
        );
    }
}

ShowImg.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    img: PropTypes.object.isRequired,
};