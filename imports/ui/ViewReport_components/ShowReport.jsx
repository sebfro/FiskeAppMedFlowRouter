import React, {Component, PropTypes} from 'react';


export default class ShowReport extends Component {
    render(){
        console.log(this.props.report.img);
        return(
            <ul>
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