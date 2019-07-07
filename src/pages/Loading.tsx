import React from 'react';
import {LoadingComponentProps} from 'react-loadable';

// TODO: add styles

export default function({error, timedOut, pastDelay, retry}: LoadingComponentProps){
    if (error)
        return <div>Error! <button onClick={ retry }>Retry</button></div>;

    if (timedOut)
        return <div>Taking a long time... <button onClick={ retry }>Retry</button></div>;

    if (pastDelay)
        return <div>Loading...</div>;

    return null;
}
