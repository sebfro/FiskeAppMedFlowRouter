import React, {Component, PropTypes} from 'react';


export default class ShowImg extends Component {

    render() {
        console.log("In showImg");
        console.log("In showImg");
        console.log("In showImg");
        console.log("In showImg");
        console.log("In showImg");
        console.log("In showImg");
        return (
            <li>
                <img className="smallImg" src={this.props.img} height={80} width={80}/>
            </li>
        );
    }
}

ShowImg.propTypes = {
    //This component gets the report to display thorugh a React prop
    //we can use proprTypes to indicate it is required
    img: PropTypes.object.isRequired,
};