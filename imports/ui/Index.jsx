import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, ButtonGroup, Nav, Navbar, ListGroup, Glyphicon} from 'react-bootstrap';


import {Reports} from '../../lib/reports.js';

import Report from './Index_components/Report.jsx';
import ChooseReportType from './Index_components/ChooseReportType.jsx';
import {
    pageText,
    norwegian,
    english,
    norwegianNav,
    englishNav,
    norwegianLogin,
    englishLogin,
    norwegianRecovery,
    englishRecovery,
    norwegianReport,
    englishReport
} from '../../lib/pagetext.js';


//Index komponent - Gjengir hovedsiden til applikasjonen
class Index extends Component {
    constructor(props) {
        super(props);
        if (Session.get('language') === undefined) {
            Session.set('language', 'norwegian');
        }
        this.state = {
            language: Session.get('language'),
            showMoreBtn: true,
            pageText: null,
            pageTextNav: null,
            pageTextLogin: null,
            pageTextPassRecovery: null,
            pageTextReport: null
        };
    }

    setPageText() {
        if (Session.get('language') === "english") {
            this.setState({
                pageText: english,
                pageTextNav: englishNav,
                pageTextLogin: englishLogin,
                pageTextPassRecovery: englishRecovery,
                pageTextReport: englishReport
            });
        } else {
            this.setState({
                pageText: norwegian,
                pageTextNav: norwegianNav,
                pageTextLogin: norwegianLogin,
                pageTextPassRecovery: norwegianRecovery,
                pageTextReport: norwegianReport
            });
        }
    }


    //Kaller på report komponeneten og gjengir alle rapporter
    renderReports() {
        let reportArray = [];
        let length = this.props.reports.length;
        if (this.state.showTen) {
            length = 10;
        }

        for (let i = 0; i < this.props.reports.length; i++) {
            reportArray.push(
                <Report key={i} report={this.props.reports[i]} pageTextReport={this.state.pageTextReport}/>
            );
        }

        return reportArray;
    }

    componentWillMount() {
        Session.set('limit', 10);
        if (Session.get('language') === undefined) {
            Session.set('language', 'norwegian');
            this.setPageText();
        } else {
            this.setPageText();
        }
        if (Session.get('limit') !== this.props.reports.length && this.props.reports.length > 0) {
            this.setState({
                showMoreBtn: false
            })
        }
    }


    changeLanguage(e) {
        e.preventDefault();
        if (Session.get('language') === 'english') {
            Session.set('language', 'norwegian');
        } else {
            Session.set('language', 'english');
        }
        this.setPageText();
    }

    setShowMoreBtn(e) {
        e.preventDefault();
        Session.set('limit', Session.get('limit') + 10);
        console.log(Session.get('limit'));
    }

    showFlag(){
        if(this.state.language === 'english'){
            return "/united_kingdom_flag_icon.png"
        } else {
            return "/norway_flag_icon.png"
        }
    }

    flagBtn() {
        const backBtnStyle = {
            float: 'right',
            paddingTop: 14,
            paddingRight: 24,
        };
        return (
            <button type="button" className="btn btn-link" style={backBtnStyle}
                    onClick={this.changeLanguage.bind(this)}>
                <span><img src={this.showFlag()} height={20} width={20} alt=""/></span>
            </button>
        );
    }

    render() {
        return (
            <div className="pageContainer">
                <ChooseReportType pageTextNav={this.state.pageTextNav} flagBtn={this.flagBtn()}/>
                <br/><br/>
                <header>
                    <h1>
                        {this.state.pageText.title}
                    </h1>
                    { /*<AccountsUIWrapper pageTextLogin={this.state.pageTextLogin}/>*/ }
                </header>


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
    let loaded = false;
    Meteor.subscribe('reports', Session.get('limit'));
    return {
        loaded: loaded,
        reports: Reports.find({}, {sort: {createdAt: -1}, limit: Session.get('limit')}).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);