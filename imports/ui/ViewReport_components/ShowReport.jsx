import React, {Component, PropTypes} from 'react';

import ShowImg from './ShowImg.jsx';

//ShowReport komponenet - GJengir alle tekst innhold i rapport på skjermen
export default class ShowReport extends Component {

    //Kaller ShowImg komponent for hvert bilde i rapporten og gjengir det på skjerm
    renderImages() {
        console.log("RenderImages");
        let imgArray = [];
        for (let i = 0; i < this.props.report.photo.length; i++) {
            imgArray.push(
                <ShowImg key={i} img={this.props.report.photo[i]}/>
            )
        }
    }

    render() {
        return (
            <ul>
                <li>
                    Art: {this.props.report.text}
                </li>
                <li>
                    Dato: {this.props.report.createdAt}
                </li>
                <li>
                    Lengde: {this.props.report.length}
                </li>
                <li>
                    Antall: {this.props.report.amount}
                </li>
                <li>
                    Dybde: {this.props.report.depth}
                </li>
                <li>
                    Breddegrad: {this.props.report.latitude}
                </li>
                <li>
                    Lengdegrad: {this.props.report.longitude}
                </li>

            </ul>
        );
    }
}

ShowReport.propTypes = {
    report: PropTypes.object.isRequired,
};