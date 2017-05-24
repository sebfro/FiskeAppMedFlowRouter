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
        console.log(this.props.report.photo);
        return(
            <ul>
                <li>
                    {this.renderImages()}
                </li>
                <li>
                    {this.props.report.titel}
                </li>
                <li>
                    {this.props.report.lengde}
                </li>
                <li>
                    {this.props.report.kommentar}
                </li>
            </ul>
        );
    }
}

ShowReport.propTypes = {
    report: PropTypes.object.isRequired,
};