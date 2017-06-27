import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import { Button, ButtonGroup, Nav, Navbar, ListGroup, Glyphicon } from 'react-bootstrap';


import {Reports} from '../api/reports.js';

import Report from './Index_components/Report.jsx';
import ChooseReportType from './Index_components/ChooseReportType.jsx';
import AccountsUIWrapper from './AcountsUIWrapper.jsx';
import AccountLogin from './Index_components/AccountLogin.jsx';
import { setPageTextNav } from './Index_components/ChooseReportType.jsx';
import { backToIndex } from '../../lib/helpMethods.js';


//Index komponent - Gjengir hovedsiden til applikasjonen
class Index extends Component {
    constructor(props){
        super(props);
        Session.set('language', 'norwegian');
        this.state = {
            pageText: {
                title: 'Reports',
                logIn: 'Login',
                logOut: 'Log out',
                showMore: 'Show more',
                language: 'English',
                languageBtn: 'Norwegian'
            },
            english: {
                title: 'Reports',
                logIn: 'Login',
                logOut: 'Log out',
                showMore: 'Show more',
                language: 'English',
                langaugeBtn: 'Norsk'
            },
            norwegian: {
                title: 'Rapporter',
                logIn: 'Logg inn',
                logOut: 'Logg ut',
                showMore: 'Viss flere',
                language: 'norsk'
            },
            pageTextNav: {
                title: 'Rapporter',
                logIn: 'Logg inn',
                logOut: 'Logg ut',
                showMore: 'Viss flere'
            },
            englishNav: {
                newReport: 'New report',
                fish: 'Fish species',
                coral: 'Coral',
                unknown: 'Unknown species',
            },
            norwegianNav: {
                newReport: 'Ny rapport',
                fish: 'Fiske art',
                coral: 'koral',
                unknown: 'fremmed art',
            },
            pageTextLogin: {
                loginBtn: 'Login',
                registerbtn: 'Register',
                closeBtn: 'Close',
                forgotPassbtn: 'Forgot password?',
                placeholderEmail: 'Enter email',
                placeholderPass: 'Enter passord',
                placeholderFname: 'Enter firstname',
                placeholderLname: 'Enter lastname',
                placeholderPhoneNr: 'Enter phone number',
            },
            englishLogin: {
                loginBtn: 'Login',
                registerbtn: 'Register',
                closeBtn: 'Close',
                forgotPassbtn: 'Forgot password?',
                placeholderEmail: 'Enter email',
                placeholderPass: 'Enter passord',
                placeholderFname: 'Enter firstname',
                placeholderLname: 'Enter lastname',
                placeholderPhoneNr: 'Enter phone number',
            },
            norwegianLogin: {
                loginBtn: 'Logg inn',
                registerbtn: 'Registrer',
                closeBtn: 'Lukk',
                forgotPassbtn: 'Glemt passord?',
                placeholderEmail: 'Skriv inn email',
                placeholderPass: 'Skriv inn passord',
                placeholderFname: 'Skriv inn fornavn',
                placeholderLname: 'Skriv inn etternavn',
                placeholderPhoneNr: 'Skriv inn telefon nummer',
            },
        };
    }

    setPageText(e){
        //e.preventDefault();
        if(this.state.pageText.language === 'norsk') {
            this.setState({
                pageText: this.state.english,
                pageTextNav: this.state.englishNav,
                pageTextLogin: this.state.englishLogin
            });
            Session.set('language', 'english')
        } else {
            this.setState({
                pageText: this.state.norwegian,
                pageTextNav: this.state.norwegianNav,
                pageTextLogin: this.state.norwegianLogin
            });
            Session.set('language', 'norwegian')
        }
    }


    //Sender bruker til nyrapport siden
    newReport(event) {
        event.preventDefault();
        FlowRouter.go("/nyRapport");
    }


    //Kaller på report komponeneten og gjengir alle rapporter
    renderReports() {
        let reportArray = [];
        for (let i = 0; i < this.props.reports.length; i++) {
            reportArray.push(
                <Report key={i} report={this.props.reports[i]}/>
            );
        }

        return reportArray;
    }

    sendEmail(e){
        e.preventDefault();
        FlowRouter.go('/startPage')
    }

    logOut(e){
        e.preventDefault();
        Meteor.logout();
    }

    pushNotification(e){
        e.preventDefault();
        if(Meteor.isCordova){
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Knap i høyre bel tryyket på",
                message: "Tittelene sier alt",

            });
            cordova.plugin.notification.local.on("click", function(notification){
                console.log("Knap i høyre bel tryyket på");
            })
        }
    }

    updateReport(e){
        e.preventDefault();
        Meteor.call('reports.update', "mdWbmNK5RDHgP9uqv")
    }

    componentWillMount(){
        this.setPageText();
    }

    render() {
        return (
            <div className="container">
                <header>
                    { this.props.currentUser ?
                        <div>
                            <Button className="nyRapportBtn" bsStyle="primary" onClick={this.logOut.bind(this)}>
                                {this.state.pageText.logOut}
                            </Button>
                            <Button bsStyle="primary" onClick={this.pushNotification.bind(this)}>
                                <Glyphicon glyph="align-justify"/>
                            </Button>
                            <Button bsStyle="primary" onClick={this.updateReport.bind(this)}>
                                <Glyphicon glyph="align-justify"/>
                            </Button>
                        </div>
                        : <AccountLogin pageTextLogin={this.state.pageTextLogin}/>
                    }
                    <Button className="nyRapportBtn" bsStyle="primary" onClick={this.setPageText.bind(this)}>
                        {this.state.pageText.language}
                    </Button>


                    <h1>
                        {this.state.pageText.title}
                    </h1>

                    <AccountsUIWrapper pageTextLogin={this.state.pageTextLogin}/>

                </header>

                <ChooseReportType pageTextNav={this.state.pageTextNav}/>
                <br/><br/>

                <ListGroup>
                        {this.renderReports()}
                </ListGroup>
            </div>
        )
    }
}

Index.propTypes = {
    reports: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('reports', Meteor.userId());
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);