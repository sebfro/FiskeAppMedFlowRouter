import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';


export default class NavBarBackBtn extends Component {

    backToIndex(e) {
        e.preventDefault();
        console.log("Back btn pressed");
        FlowRouter.go("/homepage");
    }

    render() {
        let backBtnStyle = {
            float: 'right',
            paddingTop: 14,
            paddingRight: 24,
        };
        return (
            <div>

                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">

                            <button type="button" className="btn btn-link" style={backBtnStyle} aria-hidden="true"
                                    onClick={this.backToIndex.bind(this)}>
                                <span className="glyphicon glyphicon-arrow-right"/>
                            </button>

                            <a className="navbar-brand">
                                <img src="/imrlogo.png" height={20} width={200} alt=""/>
                            </a>
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}