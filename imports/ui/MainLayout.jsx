import React from 'react';
import {Grid, Row} from 'react-bootstrap';

//Layout som går igjen på hver side
export const MainLayout = ({header, content}) => (
    <div className="pageContainer">
        {header}
        <br/><br/>
        <br/><br/>

        {content}
    </div>
);