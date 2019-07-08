import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from './reducers'
// Mount point for app

let basename = ''
if(process.env.NODE_ENV === 'production')
    basename = 'Tic-tac-toe/'

ReactDOM.render(
    // Attach routing to application
    <BrowserRouter basename={basename} >
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    // This will find root element and attach application to DOM
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

