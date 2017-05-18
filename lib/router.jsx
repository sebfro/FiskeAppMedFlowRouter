import React from 'react';
import ReactDOM from 'react-dom';

import Index from '../imports/ui/Index.jsx';
import SubmitPage from '../imports/ui/SubmitPage.jsx';
import ViewReport from '../imports/ui/viewReport.jsx';

FlowRouter.route('/', {
    action: function(params, queryParams){
        console.log("Main page", params.postId)
        ReactLayout.render(Index);
    }
});

FlowRouter.route('/nyRapport',{
    action: function(params, queryParams) {
        console.log("Write new report");
        ReactLayout.render(SubmitPage);
    }
});

FlowRouter.route('/seRapport',{
    action: function(params, queryParams) {
        console.log("See report");
        ReactLayout.render(ViewReport);
    }
});
