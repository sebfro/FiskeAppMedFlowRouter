import React from 'react';

import Index from '../imports/ui/Index.jsx';
import SubmitPage from '../imports/ui/SubmitPage.jsx';
import ViewReport from '../imports/ui/ViewReport.jsx';

//Starter googe maps api og gir den en nøkkel
if(Meteor.isClient){
    Meteor.startup(function(){
        GoogleMaps.load({ key: 'AIzasSyAFSNWFkRXoi4cZsDzdslntFNtDZAK-lhc'});
    });
}

//Disse sender bruker til forskjellige sider.
FlowRouter.route('/', {
    name: "index",
    action (){
        ReactLayout.render(Index);
    }
});

FlowRouter.route('/nyRapport',{
    name: "nyRapport",
    action (){
        ReactLayout.render(SubmitPage);
    }
});

FlowRouter.route('/seRapport',{
    name: "seRapport",
    action (){
        ReactLayout.render(ViewReport);
    }
});
