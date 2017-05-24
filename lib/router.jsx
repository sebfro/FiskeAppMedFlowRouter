import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';

import Index from '../imports/ui/Index.jsx';
import SubmitPage from '../imports/ui/SubmitPage.jsx';
import ViewReport from '../imports/ui/ViewReport.jsx';
import {MainLayout} from '../imports/ui/MainLayout.jsx';

FlowRouter.route('/', {
    name: "index",
    action: function(params, queryParams){
        console.log("Main page")
        ReactLayout.render(Index);
    }
});

FlowRouter.route('/nyRapport',{
    name: "nyRapport",
    action (){
        console.log("Write new report");
        /*mount(MainLayout, {
            content: <SubmitPage/>
        });*/
        ReactLayout.render(SubmitPage);
    }
});

FlowRouter.route('/seRapport',{
    name: "seRapport",
    action: function(params) {
        console.log("See report");
        console.log('Params: ' + params);
        ReactLayout.render(ViewReport);
    }
});
