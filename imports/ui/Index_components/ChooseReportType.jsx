import React, {Component, PropTypes} from 'react';
import {
    Button, ButtonGroup, ButtonToolbar, Navbar,
    NavbarBrand, NavItem, Nav, Collapse
} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';

import {isVerified} from '../../../lib/helpMethods.js';

export default class ChooseReportType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    setShow(e) {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        })
    }

    newReportFisk(e) {
        e.preventDefault();
        if (isVerified()) {
            Session.set('Category', "Fiske art");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }
    }

    newReportKoral(e) {
        e.preventDefault();
        if (isVerified()) {
            Session.set('Category', "Koral");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }

    }

    notVerified() {
        alert("Du må verifisere emailen din før du kan sende inn rapporter.");
    }

    newReportFremmed(e) {
        e.preventDefault();
        if (isVerified()) {
            Session.set('Category', "Fremmed art");
            this.setSession();
            FlowRouter.go("/nyRapport");
        } else {
            this.notVerified();
        }
    }

    setSession() {
        console.log("Marker has been set");
        Session.set('addMarker', true);
    }

    logOut(e){
        e.preventDefault();
        Meteor.logout();
    }
    render() {
        if (Meteor.userId()) {
            console.log(this.props.pageTextNav.logOut);
            return(
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">
                                <img src="/imrlogo.png" height={20} width={200} alt=""/>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a onClick={this.newReportFisk.bind(this)}>{this.props.pageTextNav.fish}</a></li>
                                <li><a onClick={this.newReportKoral.bind(this)}>{this.props.pageTextNav.coral}</a></li>
                                <li><a onClick={this.newReportFremmed.bind(this)}>{this.props.pageTextNav.unknown}</a></li>
                                <li><a onClick={this.logOut.bind(this)} >{this.props.pageTextNav.logOut}</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
            /*return (
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Logo</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#about">ABOUT</a></li>
                                <li><a href="#services">SERVICES</a></li>
                                <li><a href="#portfolio">PORTFOLIO</a></li>
                                <li><a href="#pricing">PRICING</a></li>
                                <li><a href="#contact">CONTACT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )*/
             /*
             return (
             <div>
             <Nav bsStyle="pills" justified>
             <NavItem onClick={this.setShow.bind(this)}>
             {this.props.pageTextNav.newReport}
             </NavItem>
             </Nav>
             <Collapse in={this.state.show}>
             <Nav bsStyle="pills" justified>
             <NavItem onClick={this.newReportFisk.bind(this)}>
             {this.props.pageTextNav.fish}
             </NavItem>
             <NavItem onClick={this.newReportKoral.bind(this)}>
             {this.props.pageTextNav.coral}
             </NavItem>
             <NavItem onClick={this.newReportFremmed.bind(this)}>
             {this.props.pageTextNav.unknown}
             </NavItem>
             </Nav>
             </Collapse>
             </div>
             )*/


            /*return(
             <ul>
             <li><a className="active" href="#home">Home</a></li>
             <li><a href="#news">News</a></li>
             <li><a href="#contact">Contact</a></li>
             <li><a href="#about">About</a></li>
             </ul>
             )*/


            /*return (
             <div>
             <ButtonGroup justified className='category' bsSize="large" bsStyle="primary" >
             <Button bsStyle="primary" onClick={this.newReportFisk.bind(this)}>
             Fiske Art
             </Button>
             <Button bsStyle="primary" onClick={this.newReportKoral.bind(this)}>
             Koral
             </Button>
             <Button bsStyle="primary" onClick={this.newReportFremmed.bind(this)}>
             Fremmed Art
             </Button>
             </ButtonGroup>
             </div>
             )*/
        } else {
            return null;
        }
    }
}

ChooseReportType.propTypes = {
    pageTextNav: PropTypes.object.isRequired,
};