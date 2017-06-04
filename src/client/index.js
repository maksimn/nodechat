import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import Application from './js/Application';
import store from './js/store';

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>
, document.getElementById('app'));