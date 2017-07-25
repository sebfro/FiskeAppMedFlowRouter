import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Panel, ListGroup, PanelGroup} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';


import {Reports, remote} from '../../lib/reports.js';
import {Loading_feedback} from './Common_components/Loading_feedback.jsx'
import Report from './Index_components/Report.jsx';
import ChooseReportType from './Index_components/ChooseReportType.jsx';
import {
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
import ShowMoreBtn from './Index_components/ShowMoreBtn.jsx';
import {loggedInToFacebook} from "../../lib/helpMethods";

const panelStyle = {paddingTop: 10};


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
        let verifiedReportArray = [];
        let unVerifiedReportArray = [];
        let length = this.props.reports.length;
        if (this.state.showTen) {
            length = 10;
        }

        for (let i = 0; i < this.props.reports.length; i++) {
            if (this.props.reports[i].isValidated) {
                verifiedReportArray.push(
                    <Report key={i} report={this.props.reports[i]}/>
                );
            } else {
                unVerifiedReportArray.push(
                    <Report key={i} report={this.props.reports[i]}/>
                );
            }
        }

        return (
                <PanelGroup>
                    <Panel style={panelStyle} bsStyle="primary" collapsible defaultExpanded header={i18n.__('common.index.verified')}>
                        <ListGroup fill>
                            {verifiedReportArray}
                            <ShowMoreBtn/>
                        </ListGroup>
                    </Panel>
                    <Panel  bsStyle="primary" collapsible defaultExpanded header={i18n.__('common.index.unVerified')}>
                        <ListGroup fill>
                            {unVerifiedReportArray}
                            <ShowMoreBtn/>
                        </ListGroup>
                    </Panel>
                </PanelGroup>
        );
    }

    componentWillMount() {

        loggedInToFacebook();
        Session.set('limit', 10);
        if (Session.get('language') === undefined) {
            Session.set('language', 'norwegian');
            this.setPageText();
        } else {
            this.setPageText();
        }
    }


    render() {
        if (this.props.reports) {
            return (
                <div className="pageContainer">
                    <ChooseReportType/>
                    <br/><br/>

                    {this.props.reports ?
                        this.renderReports()
                        : <Loading_feedback/>}
                </div>
            )
        } else {
            return <Loading_feedback/>;
        }
    }
}

export default createContainer(() => {
    let loaded = false;
    let fields = {
        text: 1, user: 1,
        isValidated: 1, createdAt: 1,
        scientist: 1, category: 1, owner: 1,
        markerId: 1, taken: 1,
    };
    let user = Meteor.userId();
    remote.subscribe('reports.reportingToolList', user, Session.get('limit'));
    return {
        loaded: loaded,
        reports: Reports.find({owner: user}, {
            sort: {createdAt: -1},
            limit: Session.get('limit'), fields: fields
        }).fetch(),
        currentUser: Meteor.user(),
    };
}, Index);