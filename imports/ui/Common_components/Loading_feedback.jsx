import React from 'react';

const style = {
    color: 'red',
    paddingLeft: 17,
};

export const Loading_feedback = () => (
    <div>
        <div className="loader" />
        {/*<p className="loader_text">Loading...</p>*/}
    </div>
);

export function errorMsg(msg, show){
    return show === 'error' ? (<p style={style}> {msg} </p>) : null
}