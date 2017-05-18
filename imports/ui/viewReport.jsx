import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Reports} from '../api/reports';
import ShowImg from './Index_components/ShowImg.jsx';

class ViewReport extends Component{

    renderImg(){
        return this.props.report.photo.map((img) => (
            <ShowImg key={img._id} img={img}/>
        ));
    }

    backToIndex(){
        FlowRouter.go("/");
    }

    render(){
        return(
            <div className="container">
                <header>
                    <h1>Ny rapport</h1>

                    <button className="nyRapportBtn" onClick={this.backToIndex.bind(this)}>
                        Tilbake
                    </button>
                </header>

                <ul>
                    <li>
                        {this.props.report.kommentar}
                    </li>
                    <li>
                        {this.props.report.lengde}
                    </li>
                    <li>
                        {this.renderImg()}
                    </li>
                    <li>
                        {this.props.report.location}
                    </li>
                </ul>
                <p>Dette er en test</p>
            </div>
        );
    }
}

ViewReport.propTypes = {
    report: PropTypes.array.isRequired,
};

export default createContainer(() =>{
    return{
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
    }
});