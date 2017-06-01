import React, {Component, PropTypes} from 'react';

import ShowImg from './ShowImg.jsx';

export default class ShowReport extends Component {

    renderImages(){
        console.log("RenderImages");
        let imgArray = [];
        for ( let i = 0; i < this.props.report.photo.length; i++){
            imgArray.push(
                <ShowImg key={i} img={this.props.report.photo[i]}/>
            )
        }
    }

    render(){
        console.log("Rett under her");
        console.log("Rett under her");
        console.log("Rett under her");
        console.log("Rett under her");
        console.log(' ' + this.props.report.latitude + ' ');
        return(
            <ul>
                    {this.renderImages()}
                <li>
                    {this.props.report.text}
                </li>
                <li>
                    {this.props.report.length}
                </li>
                <li>
                    {this.props.report.amount}
                </li>
                <li>
                    {this.props.report.depth}
                </li>
                <li>
                    {this.props.report.latitude}
                </li>
                <li>
                    {this.props.report.longitude}
                </li>

            </ul>
        );
    }
}

ShowReport.propTypes = {
    report: PropTypes.object.isRequired,
};