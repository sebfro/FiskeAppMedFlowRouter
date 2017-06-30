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


//Index komponent - Gjengir hovedsiden til applikasjonen
class Index extends Component {
    constructor(props){
        super(props);
        if(Session.get('language') === undefined){
            Session.set('language', 'norwegian');
        }
        console.log(Session.get('language'));
        this.state = {
            showMoreBtn: true,
            pageText: {
                title: 'Reports',
                logIn: 'Login',
                logOut: 'Log out',
                showMore: 'Show more',
                language: 'English',
            },
            english: {
                title: 'Reports',
                logIn: 'Login',
                logOut: 'Log out',
                showMore: 'Show more',
                language: 'English',
            },
            norwegian: {
                title: 'Rapporter',
                logIn: 'Logg inn',
                logOut: 'Logg ut',
                showMore: 'Viss flere',
                language: 'Norsk'
            },
            pageTextNav: {
                logIn: 'Logg inn',
                logOut: 'Logg ut',
                newReport: 'New report',
                fish: 'Fish species',
                coral: 'Coral',
                unknown: 'Unknown species',
            },
            englishNav: {
                logIn: 'Login',
                logOut: 'Log out',
                newReport: 'New report',
                fish: 'Fish species',
                coral: 'Coral',
                unknown: 'Unknown species',
            },
            norwegianNav: {
                logIn: 'Logg inn',
                logOut: 'Logg ut',
                newReport: 'Ny rapport',
                fish: 'Fiske art',
                coral: 'Koral',
                unknown: 'Fremmed art',
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
            pageTextPassRecovery: {
                titel: 'Forgot password',
                placeholderEmail: 'Enter email',
                closeBtn: 'Close',
                message: 'An email has been sent to your email.'
            },
            englishRecovery: {
                titel: 'Forgot password',
                placeholderEmail: 'Enter email',
                closeBtn: 'Close',
                message: 'An email has been sent to your email.'
            },
            norwegianRecovery: {
                titel: 'Glemt passord',
                placeholderEmail: 'Skriv inn email',
                closeBtn: 'Lukk',
                message: 'En mail har blitt sent til eposten din.'
            },
            pageTextReport: {
                category: 'Category',
                fish: 'Fish specie',
                coral: 'Coral',
                unknown: 'Unknown specie'
            },
            englishReport: {
                category: 'Category',
                fish: 'Fish specie',
                coral: 'Coral',
                unknown: 'Unknown specie'
            },
            norwegianReport: {
                category: 'Kategori',
                fish: 'Fiske art',
                coral: 'koral',
                unknown: 'fremmed art'
            }
        };
    }

    setPageText(){
        if(Session.get('language') === "english") {
            this.setState({
                pageText: this.state.english,
                pageTextNav: this.state.englishNav,
                pageTextLogin: this.state.englishLogin,
                pageTextPassRecovery: this.state.englishRecovery,
                pageTextReport: this.state.englishReport
            });
        } else {
            this.setState({
                pageText: this.state.norwegian,
                pageTextNav: this.state.norwegianNav,
                pageTextLogin: this.state.norwegianLogin,
                pageTextPassRecovery: this.state.norwegianRecovery,
                pageTextReport: this.state.norwegianReport
            });
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
        let length = this.props.reports.length;
        console.log(length);
        if(this.state.showTen){
            length = 10;
        }

        for (let i = 0; i < this.props.reports.length; i++) {
            reportArray.push(
                <Report key={i} report={this.props.reports[i]} pageTextReport={this.state.pageTextReport}/>
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
        Session.set('limit', 10);
        if(Session.get('language') === undefined) {
            Session.set('language', 'norwegian');
            this.setPageText();
        } else {
            this.setPageText();
        }
        console.log("Component will mount");
        if(Session.get('limit') !== this.props.reports.length && this.props.reports.length > 0){
            this.setState({
                showMoreBtn: false
            })
        }
    }
    componentWillUpdate(){
        /*if(Session.get('limit') !== this.props.reports.length && this.props.reports.length > 0){
            this.setState({
                showMoreBtn: false
            })
        }*/
    }
    changeLanguage(e){
        e.preventDefault();
        if(Session.get('language') === 'english'){
            Session.set('language', 'norwegian');
            this.setPageText();
        } else {
            Session.set('language', 'english');
            this.setPageText();
        }
    }
    setShowMoreBtn(e){
        e.preventDefault();
        Session.set('limit', Session.get('limit') + 10);
        console.log(Session.get('limit'));
    }

    render() {
        return (
            <div className="pageContainer">
                <ChooseReportType pageTextNav={this.state.pageTextNav}/>
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
                        : <AccountLogin pageTextLogin={this.state.pageTextLogin} pageTextPassRecovery={this.state.pageTextPassRecovery}/>
                    }
                    <Button className="nyRapportBtn" bsStyle="primary" onClick={this.changeLanguage.bind(this)}>
                        {this.state.pageText.language}
                    </Button>


                    <h1>
                        {this.state.pageText.title}
                    </h1>

                    <AccountsUIWrapper pageTextLogin={this.state.pageTextLogin}/>

                </header>

                <br/><br/>

                <ListGroup>
                        {this.renderReports()}
                </ListGroup>
                {this.state.showMoreBtn ?
                    <Button className="nyRapportBtn" bsStyle="primary" onClick={this.setShowMoreBtn.bind(this)}>
                        Viss flere
                    </Button>
                    : ''
                }
            </div>
        )
    }
}

Index.propTypes = {
    reports: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('reports', Session.get('limit'));
    return {
        reports: Reports.find({}, {sort: {createdAt: -1}, limit: Session.get('limit') }).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);